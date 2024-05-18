import { config } from "@src/config/config";
import { TTokenType, tokenTypes } from "@src/config/tokens";
import moment from "moment";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { IUser } from "@src/features/auth/user/user.model";
import Token, { IToken } from "@src/features/auth/token/token.model";

export const generateJwtToken = ({ userId, expires, tokenType, secret }: { userId: mongoose.Types.ObjectId; expires: moment.Moment; tokenType: TTokenType; secret: string }): string => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type: tokenType,
    };
    return jwt.sign(payload, secret);
}

export const saveToken = async ({token, userId, expires, tokenType} : {token: string; userId: mongoose.Types.ObjectId; expires: moment.Moment; tokenType: TTokenType}): Promise<IToken> => {
    const tokenDoc = await Token.create({
        token,
        userId: userId,
        expires: expires.toDate(),
        tokenType,
    });
    return tokenDoc;
};

export const generateAuthToken = async ({user}: {user: IUser}): Promise<{access: {token: string; expires: Date}}> => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationHours, 'hours');
    const accessToken = generateJwtToken({userId: user._id!, expires: accessTokenExpires, tokenType: tokenTypes.ACCESS as TTokenType, secret: config?.jwt?.secret ?? ''});
    await saveToken({token: accessToken, expires: accessTokenExpires, userId: user._id!, tokenType: tokenTypes.ACCESS as TTokenType});
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
    }
}

export const getTokenDetailsByToken = async ({token}: {token: string}): Promise<IToken | null> => {
    const result = await Token.findOne({token});
    return result;
}

export const deleteToken = async ({token, tokenType}: {token: string; tokenType?: TTokenType}): Promise<void> => {
    await Token.deleteOne({token, tokenType: tokenType ?? tokenTypes?.ACCESS});
}