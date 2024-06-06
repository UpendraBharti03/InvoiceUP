import {getModelForClass, modelOptions, pre, prop} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { modelsInfo } from '@src/models';
import { IProduct } from "@src/features/product/product.model";
import { ICustomer } from "@src/features/customer/customer.model";

export enum EInvoiceStatus {
    "UNPAID" = "unpaid",
    "PARTIAL" = "partial",
    "PAID" = "paid",
}

@modelOptions({ schemaOptions: { collection: modelsInfo.INVOICE.collectionName, timestamps: true } })
export class IInvoice {
    public _id?: mongoose.Types.ObjectId;

    @prop({type: mongoose.SchemaTypes.ObjectId, required: true, ref: modelsInfo?.USER?.modelName})
    public userId!: mongoose.Types.ObjectId;

    // @prop({ type: String, required: true })
    // public invoiceNumber!: string;

    @prop({ type: IProduct, required: true, ref: modelsInfo?.PRODUCT?.modelName })
    public product!: IProduct;

    @prop({ type: ICustomer, required: true, ref: modelsInfo?.CUSTOMER?.modelName })
    public customer!: ICustomer;

    // @prop({ type: String, required: true, ref: modelsInfo?.PAYMENT?.modelName })
    // public payment?: string;

    @prop({type: String, required: true, enum: EInvoiceStatus, default: EInvoiceStatus.UNPAID})
    public status!: EInvoiceStatus;

    @prop({type: Number, required: true})
    public priceTotal!: number;

    @prop({type: Number, required: false, default: 0})
    public taxRate!: number;

    @prop({type: Number, required: true})
    public payableAmount!: number;

    @prop({type: Date, required: true})
    public dueDate!: Date;

    @prop({type: String, required: false, default: ""})
    public invoiceDescription!: string;

    @prop({type: Boolean, required: false, default: false})
    public isDeleted?: boolean;
}

const Invoice = getModelForClass(IInvoice);
export default Invoice;