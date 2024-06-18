import {PropType, getModelForClass, modelOptions, pre, prop} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { modelsInfo } from '@src/models';
import { IProduct } from "@src/features/product/product.model";
import { ICustomer } from "@src/features/customer/customer.model";

export enum EInvoiceStatus {
    "UNPAID" = "unpaid",
    "PARTIAL" = "partial",
    "PAID" = "paid",
}

export class IProductItem {
    @prop({type: mongoose.SchemaTypes.ObjectId, required: true, ref: modelsInfo?.PRODUCT?.modelName})
    public productId!: mongoose.Types.ObjectId;
    
    @prop({type: IProduct, required: true})
    public product!: IProduct;

    @prop({type: Number, required: true})
    public quantity!: number;

    @prop({type: Number, required: true})
    public unitPrice!: number;

    @prop({type: Number, required: false, default: 0})
    public discount?: number;
}

@modelOptions({ schemaOptions: { collection: modelsInfo.INVOICE.collectionName, timestamps: true } })
export class IInvoice {
    public _id?: mongoose.Types.ObjectId;

    @prop({type: mongoose.SchemaTypes.ObjectId, required: true, ref: modelsInfo?.USER?.modelName})
    public userId!: mongoose.Types.ObjectId;

    // @prop({ type: String, required: true })
    // public invoiceNumber!: string;

    @prop({ type: IProductItem, required: true }, PropType.ARRAY)
    public productItems!: IProductItem[];

    @prop({type: mongoose.SchemaTypes.ObjectId, required: true, ref: modelsInfo?.CUSTOMER?.modelName})
    public customerId!: mongoose.Types.ObjectId;

    @prop({ type: ICustomer, required: true })
    public customer!: ICustomer;

    // @prop({ type: String, required: true, ref: modelsInfo?.PAYMENT?.modelName })
    // public payment?: string;

    @prop({type: String, required: false, enum: EInvoiceStatus, default: EInvoiceStatus.UNPAID})
    public status?: EInvoiceStatus;

    @prop({type: Number, required: true})
    public totalPrice!: number;

    @prop({type: Number, required: false, default: 0})
    public taxRate?: number;

    @prop({type: Number, required: true})
    public totalAmount!: number;

    @prop({type: Date, required: true})
    public dueDate!: Date;

    @prop({type: String, required: false, default: ""})
    public invoiceDescription?: string;

    @prop({type: Boolean, required: false, default: false})
    public isDeleted?: boolean;
}

const Invoice = getModelForClass(IInvoice);
export default Invoice;