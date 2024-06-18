import { Response } from "express";
import httpStatus from "http-status";
import { updateUserById } from "@src/features/auth/user/user.service";
import { sanitizeUser } from "@src/features/auth/auth.service";
import { IUser } from "@src/features/auth/user/user.model";

const updateUserProfileHandler = async (req: any, res: Response) => {
    const reqBody = req.body;
    const userId = req.user._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    const payload = {
        ...reqBody,
        name: {
            ...reqBody?.name,
            fullName: reqBody?.name?.first + ' ' + reqBody?.name?.last,
        },
    };

    const user = await updateUserById({userId, payload}) as IUser;

    return res.sendJSONResponse({
        data: {
            user: sanitizeUser({ user }),
        },
        message: "Successfully updated profile",
    });
}

export default { updateUserProfileHandler };