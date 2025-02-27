import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import User, { IUser } from '@src/features/auth/user/user.model';
import ApiError from '@src/utils/ApiError';
import mongoose from 'mongoose';

/**
 * Password Matched or not
 * @param passwordInput - password input which is being checked
 * @param passwordHash - hash password which is stored in db
 */
export const isPasswordMatch = async ({ passwordInput, passwordHash }: { passwordInput: string; passwordHash?: string }): Promise<boolean> => {
    if (passwordHash) {
        return bcrypt.compare(passwordInput, passwordHash)
    }
    return false;
};

export const isEmailTaken = async ({email}: {email: string}) => {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({normalizedEmail});
    return !!user;
}

export const createUser = async ({userBody, session}: {userBody: Omit<IUser, "_id" | "normalizedEmail">, session?: any}): Promise<IUser> => {
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

export const getUserById = async ({userId}: {userId: mongoose.Types.ObjectId}): Promise<IUser | null> => {
    const user = await User.findById(userId);
    return user;
}

export const getUserByEmail = async ({email}: {email: string}) => {
    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({normalizedEmail});
    return user;
}

export const updateUserById = async ({userId, payload}:{userId: mongoose.Types.ObjectId; payload: IUser}): Promise<IUser | null> => {
    const user = await getUserById({userId});
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    if (payload.email && (await isEmailTaken({email: payload.email}))) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    const updatedUser = await User.findOneAndUpdate({_id: userId}, payload, { new: true })
    return updatedUser;
  };