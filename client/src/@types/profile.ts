import { UserZS } from "@/@types/zodSchema/userZS";
import { z } from "zod";

export const UserProfileFormZS = UserZS.omit({
    _id: true,
    password: true,
}).extend({
    isEditable: z.boolean().optional(),
});

export type TUserProfileFormZS = z.infer<typeof UserProfileFormZS>;