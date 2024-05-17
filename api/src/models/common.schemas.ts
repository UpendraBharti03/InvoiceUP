import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({schemaOptions: {_id: false}})
export class INameModel {
    @prop({ type: String, required: true })
    public fullName!: string;

    @prop({ type: String, required: true })
    public first!: string;

    @prop({ type: String, required: false, default: '' })
    public middle?: string;

    @prop({ type: String, required: false, default: '' })
    public last?: string;
}