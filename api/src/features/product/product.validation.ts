import { ValidateMiddlewareParams } from "@src/middlewares/validate";

export const createProductValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'userId': 'required|mongoId',
            'productName': 'required|string',
            'productDescription': 'string',
            'measurementUnit': 'required|string',
            'price': 'required|numeric',
            'taxRate': 'numeric',
            'totalAmount': 'numeric',
        },
    },
}

export const updateProductValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'userId': 'required|mongoId',
            'productName': 'string',
            'productDescription': 'string',
            'measurementUnit': 'string',
            'price': 'numeric',
            'taxRate': 'numeric',
            'totalAmount': 'numeric',
        },
    },
}