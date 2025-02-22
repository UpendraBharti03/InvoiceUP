import { Request, Response } from "express";
import { createUser, getUserById } from "@src/features/auth/user/user.service";
import { IUser } from "@src/features/auth/user/user.model";
import { generateAuthToken } from "@src/features/auth/token/token.service";
import mongoose from "mongoose";
import httpStatus from "http-status";
import { getNewAccessToken, loginUserWithEmailPassword, logoutUser, sanitizeUser } from "./auth.service";

const signUpHandler = async (req: Request, res: Response) => {
    const reqBody = req.body;
    const userBody: Omit<IUser, "_id" | "normalizedEmail"> = {
        name: {
            fullName: reqBody?.firstName + ' ' + reqBody?.lastName,
            first: reqBody?.firstName,
            last: reqBody?.lastName,
        },
        email: reqBody?.email,
        passwordHash: reqBody?.password,
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const user = await createUser({ userBody, session });
        const tokens = await generateAuthToken({ user });

        await session.commitTransaction();

        return res.sendJSONResponse({
            data: {
                user: sanitizeUser({ user }),
                tokens,
            },
            message: "Sign Up completed"
        })
    } catch (err: any) {
        console.log('-> error', err);
        await session.abortTransaction();

        return res.sendJSONResponse({
            code: httpStatus.BAD_REQUEST,
            success: false,
            message: err?.message,
        })
    }
}

const loginHandler = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await loginUserWithEmailPassword({ email, password });
    const tokens = await generateAuthToken({ user });

    return res.sendJSONResponse({
        data: {
            user: sanitizeUser({ user }),
            tokens,
        },
        message: "successfully logged in"
    })
}

const logoutHandler = async (req: Request, res: Response) => {
    const token = req.body.token;
    await logoutUser({ token });

    return res.sendJSONResponse({
        data: {},
        message: "successfully logged out"
    })
}

const getProfileHandler = async (req: any, res: Response) => {
    const user = req.user;
    res.sendJSONResponse({
        data: {
            user: sanitizeUser({ user }),
        },
    })
}

const getNewAccessTokenHandler = async (req: Request, res: Response) => {
    const oldAccessToken = req.body.accessToken;
    const tokens = await getNewAccessToken({oldAccessToken});

    return res.sendJSONResponse({
        data: {
            tokens,
        },
    });
}

export default { signUpHandler, loginHandler, logoutHandler, getProfileHandler, getNewAccessTokenHandler };