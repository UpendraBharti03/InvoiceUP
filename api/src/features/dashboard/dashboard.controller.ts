import { Response } from "express";
import httpStatus from "http-status";
import { getCustomersCount } from "@src/features/customer/customer.service";
import { getProductsCount } from "@src/features/product/product.service";
import { getInvoicesCount } from "@src/features/invoice/invoice.service";

const getAnalyticsDataCountsHandler = async (req: any, res: Response) => {
    const userId = req.user._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    const customersCount = await getCustomersCount({ staticFilter: {userId, isDeleted: false}});
    const productsCount = await getProductsCount({ staticFilter: {userId, isDeleted: false}});
    const invoicesCount = await getInvoicesCount({ staticFilter: {userId, isDeleted: false}});
    
    const result = {
        customersCount,
        productsCount,
        invoicesCount,
    }

    return res.sendJSONResponse({
        data: {
            result,
        },
        message: "Dashboard analytic data fetched successfully"
    })
}

export default { getAnalyticsDataCountsHandler }