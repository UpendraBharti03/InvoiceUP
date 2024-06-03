import Product, { IProduct } from "@src/features/product/product.model";
import mongoose from 'mongoose';

export const createProduct = async ({payload, session}: {payload: Omit<IProduct, "_id">, session?: any}) => {
    const productObj = await Product.create([payload], {session});
    return productObj;
}

export const getProductDetails = async ({_id}: {_id: mongoose.Types.ObjectId}) => {
    const product = await Product.findById({_id});
    return product;
}

export const updateProduct = async ({_id, payload}: {_id: mongoose.Types.ObjectId; payload: IProduct}) => {
    const productObj = await Product.findOneAndUpdate({_id}, payload, {new: true});
    return productObj;
}

export const getProductsList = async ({userId}: {userId: mongoose.Types.ObjectId}) => {
    const productsList = await Product.find({userId});
    return productsList;
}