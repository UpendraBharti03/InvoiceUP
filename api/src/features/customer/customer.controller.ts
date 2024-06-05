import { Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { ICustomer } from "@src/features/customer/customer.model";
import { createCustomer, deleteCustomerById, getCustomerDetails, getCustomersList, updateCustomer } from "@src/features/customer/customer.service";
import { TListParams } from "@src/@types/common";

const createCustomerHandler = async (req: any, res: Response) => {
    const reqBody = req.body;
    const userId = req.user._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    const payload: Omit<ICustomer, "_id"> = {
        userId,
        name: {
            ...reqBody?.name,
            fullName: reqBody?.name?.first + " " + reqBody?.name?.last,
        },
        email: reqBody?.email,
        phone: reqBody?.phone,
        address: reqBody?.address ?? "",
    };

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const customer = await createCustomer({ payload, session });
        
        await session.commitTransaction();

        return res.sendJSONResponse({
            data: {
                result: customer,
            },
            message: "Customer created successfully"
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

const updateCustomerHandler = async (req: any, res: Response) => {
    const reqBody = req.body;
    const userId = req.user._id;
    const customerId = req.params._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    if (!customerId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid customer',
        });
    }

    const oldCustomer = await getCustomerDetails({_id: customerId});

    if (!oldCustomer) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid customer',
        });
    }

    const payload: Omit<ICustomer, "_id"> = {
        userId,
        name: reqBody?.name ? {
            ...reqBody?.name,
            fullName: reqBody?.name?.first + " " + reqBody?.name?.last,
        } : oldCustomer?.name,
        email: reqBody?.email ?? oldCustomer?.email,
        phone: reqBody?.phone ?? oldCustomer?.phone,
        address: reqBody?.address ?? oldCustomer?.address ?? "",
    };

    const updatedCustomer = await updateCustomer({_id: customerId, payload});

    return res.sendJSONResponse({
        data: {
            result: updatedCustomer,
        },
        message: "Customer updated successfully"
    })
}

const getCustomerDetailsHandler = async (req: any, res: Response) => {
    const userId = req.user._id;
    const customerId = req.query._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    if (!customerId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid customer',
        });
    }

    const customer = await getCustomerDetails({_id: customerId});

    if (!customer) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid customer',
        });
    }

    return res.sendJSONResponse({
        data: {
            result: customer,
        },
        message: "Customer details fetched successfully"
    })
}

const deleteCustomerHandler = async (req: any, res: Response) => {
    const userId = req.user._id;
    const customerId = req.query._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    if (!customerId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid customer',
        });
    }

    const customer = await deleteCustomerById({_id: customerId});

    if (!customer) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'Invalid customer',
        });
    }

    return res.sendJSONResponse({
        data: {
            result: customer,
        },
        message: "Customer details deleted successfully"
    })
}


const getCustomersListHandler = async (req: any, res: Response) => {
    const reqBody = req.body;
    const userId = req.user._id;

    const payload: TListParams<object, Pick<ICustomer, "userId">> = {
        search: reqBody?.search ?? '',
        page: reqBody?.page ?? 1,
        limit: reqBody?.limit,
        filter: reqBody?.filter ?? {},
        staticFilter: {
            userId,
        },
    }

    const results = await getCustomersList(payload);

    return res.sendJSONResponse({
        data: results,
        message: "Customers List fetched successfully"
    })
}

export default {createCustomerHandler, updateCustomerHandler, getCustomerDetailsHandler, deleteCustomerHandler, getCustomersListHandler};