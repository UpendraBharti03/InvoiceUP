import { ValidateMiddlewareParams } from "@src/middlewares/validate";

export const createInvoiceValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'invoiceDescription': 'string',
            'dueDate': 'required|string',
            'totalPrice': 'numeric',
            'taxRate': 'numeric',
            'totalAmount': 'numeric',
            'customerId': 'required|mongoId',
            'productItems': 'required|array',
                'productItems.*': 'required|object',
                    'productItems.*.productId': 'required|mongoId',
                    'productItems.*.quantity': 'required|numeric',
                    'productItems.*.unitPrice': 'required|numeric',
                    'productItems.*.discount': 'numeric',
        },
    },
}

export const updateInvoiceValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'invoiceDescription': 'string',
            'dueDate': 'string',
            'totalPrice': 'numeric',
            'taxRate': 'numeric',
            'totalAmount': 'numeric',
            'customerId': 'mongoId',
            'productItems': 'required|array',
                'productItems.*': 'required|object',
                    'productItems.*.productId': 'required|mongoId',
                    'productItems.*.quantity': 'required|numeric',
                    'productItems.*.unitPrice': 'required|numeric',
                    'productItems.*.discount': 'numeric',
        },
    },
}

export const updateInvoiceStatusValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'status': 'required|string',
        },
    },
}

export const getInvoiceDetailsValidation : ValidateMiddlewareParams = {
    query: {
        rules: {
            '_id': 'required|mongoId',
        },
    },
}

export const getInvoicesListValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'page': 'numeric',
            'limit': 'alphaNumeric',
            'search': 'string',
            'filter': 'object',
        },
    },
}