import { Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { IProduct } from "@src/features/product/product.model";
import { createProduct, getProductDetails, getProductsList, updateProduct } from "@src/features/product/product.service";
import { TPaginatedResponse, TListParams } from "@src/@types/common"; 

const createProductHandler = async (req: any, res: Response) => {
    const reqBody = req.body;
    const userId = req.user._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    const totalAmount = reqBody?.price + (reqBody?.price * (reqBody?.taxRate ?? 0))/100;

    const payload: Omit<IProduct, "_id"> = {
        userId,
        productName: reqBody?.productName,
        productDescription: reqBody?.productDescription ?? "",
        measurementUnit: reqBody?.measurementUnit,
        taxRate: reqBody?.taxRate ?? 0,
        price: reqBody?.price,
        totalAmount: totalAmount,
    };

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const product = await createProduct({ payload, session });
        
        await session.commitTransaction();

        return res.sendJSONResponse({
            data: {
                result: product,
            },
            message: "Product created successfully"
        })
    } catch (err: any) {
        console.log('-> error', err);
        await session.abortTransaction();

        return res.sendJSONResponse({
            code: httpStatus.BAD_REQUEST,
            success: false,
            message: err?.message,
        })
    }
}

const updateProductHandler = async (req: any, res: Response) => {
    const reqBody = req.body;
    const userId = req.user._id;
    const productId = req.params._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    if (!productId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid product',
        });
    }

    const oldProduct = await getProductDetails({_id: productId});

    if (!oldProduct) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid product',
        });
    }

    const price = reqBody?.price ?? oldProduct?.price;
    const taxRate = reqBody?.taxRate ?? oldProduct?.taxRate ?? 0;
    const totalAmount = price + (price * taxRate)/100;

    const payload: Omit<IProduct, "_id"> = {
        userId,
        productName: reqBody?.productName ?? oldProduct?.productName,
        productDescription: reqBody?.productDescription ?? oldProduct?.productDescription ?? "",
        measurementUnit: reqBody?.measurementUnit ?? oldProduct?.measurementUnit,
        taxRate,
        price,
        totalAmount,
    };

    const updatedProduct = await updateProduct({_id: productId, payload});

    return res.sendJSONResponse({
        data: {
            result: updatedProduct,
        },
        message: "Product updated successfully"
    })
}

const getProductDetailsHandler = async (req: any, res: Response) => {
    const userId = req.user._id;
    const productId = req.query._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    if (!productId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid product',
        });
    }

    const product = await getProductDetails({_id: productId});

    if (!product) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid product',
        });
    }

    return res.sendJSONResponse({
        data: {
            result: product,
        },
        message: "Product details fetched successfully"
    })
}

const getProductsListHandler = async (req: any, res: Response) => {
    const reqBody = req.body;
    const userId = req.user._id;

    const payload: TListParams<object, Pick<IProduct, "userId">> = {
        search: reqBody?.search ?? '',
        page: reqBody?.page ?? 1,
        limit: reqBody?.limit,
        filter: reqBody?.filter ?? {},
        staticFilter: {
            userId,
        },
    }

    const results: TPaginatedResponse<IProduct> = await getProductsList(payload);

    return res.sendJSONResponse({
        data: results,
        message: "Products List fetched successfully"
    })
}

export default {createProductHandler, updateProductHandler, getProductDetailsHandler, getProductsListHandler};