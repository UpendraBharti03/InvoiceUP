import { Request, Response } from "express";
import { createUser } from "@src/features/auth/user/user.service";
import { IUser } from "@src/features/auth/user/user.model";
import { generateAuthToken } from "@src/features/auth/token/token.service";

const signUpHandler = async (req: Request, res: Response) => {
    const reqBody = req.body;
    const userBody: Omit<IUser, "_id" | "normalizedEmail"> = {
        name: {
            fullName: reqBody?.first + reqBody?.middle ?? '' + reqBody?.last ?? '',
            first: reqBody?.first,
            middle: reqBody?.middle,
            last: reqBody?.last,
        },
        email: reqBody?.email,
        passwordHash: reqBody?.password,
    }

    const user = createUser({userBody});
    // const token = generateAuthToken()
}

export default {signUpHandler}