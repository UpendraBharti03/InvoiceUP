import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { getTokenDetailsByToken } from "@src/features/auth/token/token.service";
import { tokenTypes } from "@src/config/tokens";
import { getUserById } from "./user/user.service";
import catchAsync from "@src/utils/catchAsync";
import mongoose from "mongoose";
import ApiError from "@src/utils/ApiError";

export const authenticate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const reqBody = req.body;
    const accessToken = req.headers?.authorization?.replace("Bearer ", "");

    if (!accessToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
    }

    const tokenDetails = await getTokenDetailsByToken({ token: accessToken! });

    if (!tokenDetails) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
    }

    // @ts-ignore - TODO: type check
    const user = await getUserById({userId: tokenDetails?.userId! as mongoose.Types.ObjectId})

    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
    }

    // @ts-ignore - TODO: type check
    req.user = user;

    next();
})