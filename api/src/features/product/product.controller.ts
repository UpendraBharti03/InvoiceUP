import { Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import { IProduct } from "@src/features/product/product.model";
import { createProduct } from "@src/features/product/product.service";

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
        productDescription: reqBody?.productDescription,
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

export default {createProductHandler};