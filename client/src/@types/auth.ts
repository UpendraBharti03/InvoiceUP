import { z } from "zod";
import { TUserZS, UserZS } from "@/@types/zodSchema/userZS";
import { messages } from "@/messages";

export type TAuthPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type TAuthSliceState = {
    isAuthenticated: boolean,
    isAuthLoading: boolean,
    accessToken: string,
    user: TUserZS | null,
}

export type TTokenAndExpires = {
    token: string;
    expires: Date;
}

export type TTokens = {
    access: TTokenAndExpires;
}

export type TProfile = {
    user: TUserZS;
    tokens: TTokens;
}

export const LoginFormZS = UserZS.pick({
    email: true,
    password: true,
});

export type TLoginFormZS = z.infer<typeof LoginFormZS>;

export const SignupFormZS = UserZS.omit({
    _id: true,
    name: true,
}).extend({
    firstName: z.string().trim().min(1, messages.FIRST_NAME_REQUIRED),
    lastName: z.string().trim().min(1, messages.LAST_NAME_REQUIRED),
    confirmPassword: z.string().min(4).min(1, messages.PASSWORD_REQUIRED),
}).superRefine((values, ctx) => {
    if (values?.confirmPassword !== values?.password) {
        ctx.addIssue({
          code: "custom",
          message: messages.PASSWORDS_DID_NOT_MATCH,
          path: ['confirmPassword']
        });
      }
});

export type TSignupFormZS = z.infer<typeof SignupFormZS>;