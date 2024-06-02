import { z } from "zod";
import { messages } from "@/messages";

export const NameZS = z.object({
    fullName: z.string().trim(),
    first: z.string().trim().min(1, messages.FIRST_NAME_REQUIRED),
    last: z.string().trim().min(1, messages.FIRST_NAME_REQUIRED),
})

export type TNameZS = z.infer<typeof NameZS>;

export const UserZS = z.object({
    _id: z.string(),
    name: NameZS,
    email: z.string().trim().email().min(1, messages.EMAIL_REQUIRED),
    password: z.string().min(4).min(1, messages.PASSWORD_REQUIRED),
})

export type TUserZS = z.infer<typeof UserZS>;