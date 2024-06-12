import { ValidateMiddlewareParams } from "@src/middlewares/validate";

export const createCustomerValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'name': 'required|object',
                'name.fullName': 'string',
                'name.first': 'required|string',
                'name.last': 'required|string',
            'email': 'required|string|email',
            'phone': 'required|string',
            'address': 'string',
        },
    },
}

export const updateCustomerValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'name': 'object',
                'name.fullName': 'string',
                'name.first': 'string',
                'name.last': 'string',
            'email': 'string|email',
            'phone': 'string',
            'address': 'string',
        },
    },
}

export const getCustomerDetailsValidation : ValidateMiddlewareParams = {
    query: {
        rules: {
            '_id': 'required|mongoId',
        },
    },
}

export const getCustomersListValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'page': 'numeric',
            'limit': 'alphaNumeric',
            'search': 'string',
            'filter': 'object',
        },
    },
}