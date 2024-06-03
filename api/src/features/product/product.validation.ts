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