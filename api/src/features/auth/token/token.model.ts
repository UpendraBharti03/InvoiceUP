import { TTokenType, tokenTypes } from "@src/config/tokens";
import { modelsInfo } from "@src/models";
import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: { collection: modelsInfo.TOKEN.collectionName, timestamps: true } })
export class IToken {
    public _id?: mongoose.Types.ObjectId;

    @prop({type: String, required: true, ref: modelsInfo?.USER?.modelName})
    public userId!: string;
    
    @prop({type: String, required: true})
    public token!: string;

    @prop({type: String, required: true, enum: Object.values(tokenTypes)})
    public tokenType!: TTokenType;

    @prop({type: Date, required: true})
    public expires!: Date;
}

const Token = getModelForClass(IToken);
export default Token;