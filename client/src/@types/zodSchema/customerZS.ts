import { messages } from "@/messages";
import { z } from "zod";
import { NameZS } from "@/@types/zodSchema/userZS";

export const CustomerZS = z.object({
    _id: z.string(),
    userId: z.string(),
    name: NameZS,
    email: z.string().trim().email().min(1, messages.EMAIL_REQUIRED),
    phone: z.string().trim().min(1, messages.PHONE_NUMBER_REQUIRED),
    address: z.string().optional(),
})

export type TCustomerZS = z.infer<typeof CustomerZS>;