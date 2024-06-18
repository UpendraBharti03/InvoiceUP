import { ValidateMiddlewareParams } from "@src/middlewares/validate";

export const updateUserProfileValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'name': 'required|object',
                'name.fullName': 'required|string',
                'name.first': 'required|string',
                'name.last': 'required|string',
        },
    },
}