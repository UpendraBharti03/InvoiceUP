import {getModelForClass, modelOptions, pre, prop} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { modelsInfo } from '@src/models';

export enum EProductMeasurementUnits {
    "ITEM" = "item",
    "KG" = "kg",
    "LITER" = "liter",
    "METER" = "meter",
}

@modelOptions({ schemaOptions: { collection: modelsInfo.PRODUCT.collectionName, timestamps: true } })
export class IProduct {
    public _id?: mongoose.Types.ObjectId;

    @prop({type: mongoose.SchemaTypes.ObjectId, required: true, ref: modelsInfo?.USER?.modelName})
    public userId!: mongoose.Types.ObjectId;

    // @prop({ type: String, required: true })
    // public productNumber!: string;

    @prop({ type: String, required: true })
    public productName!: string;

    @prop({ type: String, required: false })
    public productDescription?: string;

    @prop({type: Number, required: true})
    public price!: number;

    @prop({type: Number, required: false, default: 0})
    public taxRate?: number;

    @prop({type: String, required: true, enum: EProductMeasurementUnits, default: EProductMeasurementUnits.ITEM})
    public measurementUnit!: EProductMeasurementUnits;

    @prop({type: Number, required: true})
    public totalAmount!: number;

    @prop({type: Boolean, required: false, default: false})
    public isDeleted?: boolean;
}

const Product = getModelForClass(IProduct);
export default Product;