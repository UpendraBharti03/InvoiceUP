import bcrypt from 'bcryptjs';
import User, { IUser } from '@src/features/auth/user/user.model';
import ApiError from '@src/utils/ApiError';

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

// export const createUser = async (userBody: Omit<IUser, "_id" | "normalizedEmail">) => {
//     if (await isEmailTaken({email: userBody.email})) {
//         throw new Error(httpStatus.BAD_REQUEST, "Email already taken");
//       }
// }