import { ValidateMiddlewareParams } from "@src/middlewares/validate";

export const signUpUserValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'firstName': 'required|string',
            'lastName': 'required|string',
            'email': 'required|string|email',
            'password': 'required',
        },
        niceNames: {
            'firstName': "First Name",
            'lastName': "Last Name",
            'email': "User email",
            'password': "User password",
        },
    },
}

export const loginUserValidation: ValidateMiddlewareParams = {
    body: {
        rules: {
            'email': 'required|string|email',
            'password': 'required',
        },
        niceNames: {
            'email': "User email",
            'password': "User password",
        },
    }
}

export const logoutUserValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'token': 'required',
        },
        niceNames: {
            'token': "Token",
        },
    },
}

export const accessTokenValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'accessToken': 'required',
        },
        niceNames: {
            'accessToken': "Token",
        },
    },
}