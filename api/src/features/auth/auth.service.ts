import httpStatus from "http-status";
import ApiError from "@src/utils/ApiError";
import { IUser } from "@src/features/auth/user/user.model";
import { getUserByEmail, getUserById, isPasswordMatch } from "@src/features/auth/user/user.service";
import { deleteToken, generateAuthToken, verifyToken } from "@src/features/auth/token/token.service";
import { tokenTypes } from "@src/config/tokens";


export const loginUserWithEmailPassword = async ({email, password}: {email: string; password: string}): Promise<IUser> => {
    const user = await getUserByEmail({email});
    const isPasswordMatched = await isPasswordMatch({passwordInput: password, passwordHash: user?.passwordHash})
    if (!user || !isPasswordMatched) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    return user;
}

export const logoutUser = async ({token}: {token: string}) => {
    await deleteToken({token});
}

export const getNewAccessToken = async ({oldAccessToken}: {oldAccessToken: string}) => {
    const token = await verifyToken({token: oldAccessToken, tokenType: tokenTypes.ACCESS})
    const user = await getUserById({userId: token.userId})
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }

    token.expires = new Date();
    await token.save();
    return await generateAuthToken({ user });
}

export const sanitizeUser = ({user}: {user: IUser}): Omit<IUser, "passwordHash" | "normalizedEmail"> => {
    const sanitizedUser = JSON.parse(JSON.stringify(user));
    delete sanitizedUser.passwordHash;
    delete sanitizedUser.normalizedEmail;
    delete sanitizedUser.__v;
    return sanitizedUser;
}