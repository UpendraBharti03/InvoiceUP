import mongoose from "mongoose";
import { Response } from "express";
import httpStatus from "http-status";
import { IInvoice, IProductItem } from "@src/features/invoice/invoice.model";
import {
  createInvoice,
  getInvoiceDetails,
  updateInvoice,
} from "@src/features/invoice/invoice.service";
import { getCustomerDetails } from "@src/features/customer/customer.service";
import { getProductDetails } from "@src/features/product/product.service";

const createInvoiceHandler = async (req: any, res: Response) => {
  const reqBody = req.body;
  const userId = req.user._id;

  if (!userId) {
    return res.sendJSONResponse({
      success: false,
      code: httpStatus.BAD_REQUEST,
      message: "No account exist.",
    });
  }

  if (!reqBody?.customerId) {
    return res.sendJSONResponse({
      success: false,
      code: httpStatus.BAD_REQUEST,
      message: "Invalid customer",
    });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const customer = await getCustomerDetails({ _id: reqBody?.customerId });

    if (!customer || !customer?.userId.equals(userId)) {
      return res.sendJSONResponse({
        success: false,
        code: httpStatus.BAD_REQUEST,
        message: "Invalid customer",
      });
    }

    const reqProductItems: Omit<IProductItem, "product">[] = reqBody?.productItems;

    let totalPrice = 0;

    const productItems = await Promise.all(
      reqProductItems?.map(async (productItem) => {
        if (!productItem?.productId) {
          return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: "Invalid product",
          });
        }

        const product = await getProductDetails({
          _id: productItem?.productId,
        });

        if (!product || !product?.userId.equals(userId)) {
          return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: "Invalid product",
          });
        }

        totalPrice = totalPrice + productItem?.quantity * (productItem?.unitPrice - (productItem?.unitPrice * (productItem?.discount ?? 0)) / 100);

        return {
          ...productItem,
          product,
        } as IProductItem;
      })
    );

    const totalAmount = totalPrice + (totalPrice * (reqBody?.taxRate ?? 0)) / 100;

    const payload: Omit<IInvoice, "_id"> = {
      userId,
      invoiceDescription: reqBody?.invoiceDescription,
      customerId: customer?._id,
      customer,
      productItems,
      dueDate: reqBody?.dueDate,
      totalPrice: totalPrice,
      taxRate: reqBody?.taxRate ?? 0,
      totalAmount,
    };

    const invoice = await createInvoice({ payload, session });

    await session.commitTransaction();

    return res.sendJSONResponse({
      data: {
        result: invoice,
      },
      message: "Invoice created successfully",
    });
  } catch (err: any) {
    console.log("-> error", err);
    await session.abortTransaction();

    return res.sendJSONResponse({
      code: httpStatus.BAD_REQUEST,
      success: false,
      message: err?.message,
    });
  }
};

const updateInvoiceHandler = async (req: any, res: Response) => {
  const reqBody = req.body;
  const userId = req.user._id;
  const invoiceId = req.params._id;

  if (!userId) {
    return res.sendJSONResponse({
      success: false,
      code: httpStatus.BAD_REQUEST,
      message: "No account exist.",
    });
  }

  if (!invoiceId) {
    return res.sendJSONResponse({
      success: false,
      code: httpStatus.BAD_REQUEST,
      message: "Invalid invoice",
    });
  }

  const oldInvoice = await getInvoiceDetails({ _id: invoiceId });

  if (!oldInvoice) {
    return res.sendJSONResponse({
      success: false,
      code: httpStatus.BAD_REQUEST,
      message: "Invalid invoice",
    });
  }

  let customer = oldInvoice?.customer;

  if (reqBody?.customerId) {
    const customerDoc = await getCustomerDetails({ _id: reqBody?.customerId });
    const customerObj = customerDoc?.toObject();

    if (!customerObj || !customerObj?.userId.equals(userId)) {
      return res.sendJSONResponse({
        success: false,
        code: httpStatus.BAD_REQUEST,
        message: "Invalid customer",
      });
    }

    customer = {...customerObj};
  }

  const reqProductItems: Omit<IProductItem, "product">[] = reqBody?.productItems ?? oldInvoice?.productItems;

  let totalPrice = 0;

  const productItems = await Promise.all(
    reqProductItems?.map(async (productItem) => {
      if (!productItem?.productId) {
        return res.sendJSONResponse({
          success: false,
          code: httpStatus.BAD_REQUEST,
          message: "Invalid product",
        });
      }

      const product = await getProductDetails({ _id: productItem?.productId });

      if (!product || !product?.userId.equals(userId)) {
        return res.sendJSONResponse({
          success: false,
          code: httpStatus.BAD_REQUEST,
          message: "Invalid product",
        });
      }

      totalPrice = totalPrice + productItem?.quantity * (productItem?.unitPrice - (productItem?.unitPrice * (productItem?.discount ?? 0)) / 100);

      return {
        ...productItem,
        product,
      } as IProductItem;
    })
  );

  const totalAmount = totalPrice + (totalPrice * (reqBody?.taxRate ?? 0)) / 100;

  const payload: IInvoice = {
    userId,
    invoiceDescription: reqBody?.invoiceDescription,
    customerId: customer?._id!,
    customer,
    productItems,
    dueDate: reqBody?.dueDate,
    totalPrice: totalPrice,
    taxRate: reqBody?.taxRate ?? 0,
    totalAmount,
  };

  const updatedInvoice = await updateInvoice({ _id: invoiceId, payload });

  return res.sendJSONResponse({
    data: {
      result: updatedInvoice,
    },
    message: "Invoice updated successfully",
  });
};

export default { createInvoiceHandler, updateInvoiceHandler };
