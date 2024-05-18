import httpStatus from "http-status";
import ApiError from "@src/utils/ApiError";
import { IUser } from "@src/features/auth/user/user.model";
import { getUserByEmail, isPasswordMatch } from "@src/features/auth/user/user.service";
import { deleteToken } from "@src/features/auth/token/token.service";


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

export const sanitizeUser = ({user}: {user: IUser}): Omit<IUser, "passwordHash" | "normalizedEmail"> => {
    const sanitizedUser = JSON.parse(JSON.stringify(user));
    delete sanitizedUser.passwordHash;
    delete sanitizedUser.normalizedEmail;
    delete sanitizedUser.__v;
    return sanitizedUser;
}