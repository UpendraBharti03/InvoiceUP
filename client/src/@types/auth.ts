export type TAuthPayload = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type TUser = {
    _id: string;
    name: {
        firstName: string;
        lastName: string;
    };
    email: string;
}

export type TAuthSliceState = {
    isAuthenticated: boolean,
    isAuthLoading: boolean,
    accessToken: string,
    user: TUser | null,
}

export type TTokenAndExpires = {
    token: string;
    expires: Date;
}

export type TTokens = {
    access: TTokenAndExpires;
}

export type TProfile = {
    user: TUser;
    tokens: TTokens;
}