import {getModelForClass, modelOptions, pre, prop} from "@typegoose/typegoose";
import { modelsInfo } from '@src/models';
import mongoose from "mongoose";
import { INameModel } from "@src/models/common.schemas";
import bcrypt from 'bcryptjs';

@pre<IUser>('save', async function (next) {
    if (this.isModified('passwordHash')) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 8);
    }
    next();
})
@modelOptions({ schemaOptions: { collection: modelsInfo.USER.collectionName } })
export class IUser {
    public _id?: mongoose.Types.ObjectId;

    @prop({type: INameModel, required: true})
    public name!: INameModel;

    @prop({ type: String, required: true })
    public email!: string;

    @prop({ type: String, required: true })
    public normalizedEmail!: string;

    @prop({type: String, required: true})
    public passwordHash!: string;
}

const User = getModelForClass(IUser);
export default User;