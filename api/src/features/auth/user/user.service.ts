import bcrypt from 'bcryptjs';
import User, { IUser } from '@src/features/auth/user/user.model';
import ApiError from '@src/utils/ApiError';
import httpStatus from 'http-status';

/**
 * Password Matched or not
 * @param passwordInput - password input which is being checked
 * @param passwordHash - hash password which is stored in db
 */
export const isPasswordMatch = async ({ passwordInput, passwordHash }: { passwordInput: string; passwordHash: string }) => {
    return bcrypt.compare(passwordInput, passwordHash)
};

export const isEmailTaken = async ({email}: {email: string}) => {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({normalizedEmail});
    return !!user;
}

export const createUser = async ({userBody, session}: {userBody: Omit<IUser, "_id" | "normalizedEmail">, session: any}) => {
    if (await isEmailTaken({email: userBody.email})) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }

    const payload: Omit<IUser, "_id"> = {
        ...userBody,
        normalizedEmail: userBody.email.toLowerCase()
    }

    const results = await User.create([payload], {session});
    return results[0];
}