import { ValidateMiddlewareParams } from "@src/middlewares/validate";

export const createInvoiceValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'invoiceDescription': 'string',
            'dueDate': 'required|date',
            'totalPrice': 'numeric',
            'taxRate': 'numeric',
            'totalAmount': 'numeric',
            'customerId': 'required|mongoId',
            'productItems': 'required|array',
                'productItems.*': 'required|object',
                    'productItems.*.productId': 'required|mongoId',
                    'productItems.*.quantity': 'required|numeric',
                    'productItems.*.unitPrice': 'required|numeric',
                    'productItems.*.discount': 'required|numeric',
        },
    },
}

export const updateInvoiceValidation : ValidateMiddlewareParams = {
    body: {
        rules: {
            'invoiceDescription': 'string',
            'dueDate': 'date',
            'totalPrice': 'numeric',
            'taxRate': 'numeric',
            'totalAmount': 'numeric',
            'customerId': 'mongoId',
            'productItems': 'array',
                'productItems.*': 'object',
                    'productItems.*.productId': 'mongoId',
                    'productItems.*.quantity': 'numeric',
                    'productItems.*.unitPrice': 'numeric',
                    'productItems.*.discount': 'numeric',
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
            'limit': 'numeric',
            'search': 'string',
            'filter': 'object',
        },
    },
}