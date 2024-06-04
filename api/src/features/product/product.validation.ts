import { ValidateMiddlewareParams } from "@src/middlewares/validate";

export const createProductValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
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
            'productName': 'string',
            'productDescription': 'string',
            'measurementUnit': 'string',
            'price': 'numeric',
            'taxRate': 'numeric',
            'totalAmount': 'numeric',
        },
    },
}

export const getProductDetailsValidation : ValidateMiddlewareParams = {
    query: {
        rules: {
            '_id': 'required|mongoId',
        },
    },
}

export const getProductsListValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'page': 'numeric',
            'limit': 'numeric',
            'search': 'string',
            'filter': 'object',
        },
    },
}