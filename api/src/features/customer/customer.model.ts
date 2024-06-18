import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { modelsInfo } from '@src/models';
import { INameModel } from "@src/models/common.schemas";

@modelOptions({ schemaOptions: { collection: modelsInfo.CUSTOMER.collectionName, timestamps: true } })
export class ICustomer {
    public _id?: mongoose.Types.ObjectId;

    @prop({type: mongoose.SchemaTypes.ObjectId, required: true, ref: modelsInfo?.USER?.modelName})
    public userId!: mongoose.Types.ObjectId;

    @prop({ type: INameModel, required: true })
    public name!: INameModel;

    @prop({ type: String, required: true })
    public email!: string;

    @prop({ type: String, required: true })
    public phone!: string;

    @prop({ type: String, required: false })
    public address?: string;

    @prop({ type: Boolean, required: false, default: false })
    public isDeleted?: boolean;
}

const Customer = getModelForClass(ICustomer);
export default Customer;