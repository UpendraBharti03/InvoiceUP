import { Response } from "express";
import httpStatus from "http-status";
import moment from "moment";
import { getCustomersCount } from "@src/features/customer/customer.service";
import { getProductsCount } from "@src/features/product/product.service";
import { getInvoicesCount, getInvoicesList } from "@src/features/invoice/invoice.service";
import { EInvoiceStatus } from "@src/features/invoice/invoice.model";

const getAnalyticsDataCountsHandler = async (req: any, res: Response) => {
    const userId = req.user._id;

    if (!userId) {
        return res.sendJSONResponse({
            success: false,
            code: httpStatus.BAD_REQUEST,
            message: 'No account exist.',
        });
    }

    const currentDate = moment().format();

    const customersCount = await getCustomersCount({ staticFilter: {userId, isDeleted: false}});
    const productsCount = await getProductsCount({ staticFilter: {userId, isDeleted: false}});
    const invoicesCount = await getInvoicesCount({ staticFilter: {userId, isDeleted: false}});
    const invoices = await getInvoicesList({ search: "", page: 1, limit: "ALL", filter: {}, staticFilter: {userId, isDeleted: false}});
    
    const invoiceResults = invoices.results;

    let totalInvoiceAmount = 0;
    let unpaidInvoiceAmount = 0;
    let paidInvoiceAmount = 0;
    let overDueInvoices = 0;
    let unpaidInvoices = 0;
    // let partialInvoices = 0;
    let paidInvoices = 0;

    invoiceResults?.forEach((invoice) => {
        totalInvoiceAmount = totalInvoiceAmount + invoice?.totalAmount;
        if(currentDate > moment(invoice?.dueDate).format()) {
            overDueInvoices++;
        }
        if (invoice?.status === EInvoiceStatus?.UNPAID) {
            unpaidInvoices++;
            unpaidInvoiceAmount = unpaidInvoiceAmount + invoice?.totalAmount;
        } else if (invoice?.status === EInvoiceStatus?.PARTIAL) {
            // partialInvoices++;
        } else if (invoice?.status === EInvoiceStatus?.PAID) {
            paidInvoices++;
            paidInvoiceAmount = paidInvoiceAmount + invoice?.totalAmount;
        }
    })

    const result = {
        customersCount,
        productsCount,
        invoice: {
            totalInvoices: invoices?.totalResults,
            totalInvoiceAmount,
            unpaidInvoiceAmount,
            paidInvoiceAmount,
            overDueInvoices,
            unpaidInvoices,
            // partialInvoices,
            paidInvoices,
        },
    }

    return res.sendJSONResponse({
        data: {
            result,
        },
        message: "Dashboard analytic data fetched successfully"
    })
}

export default { getAnalyticsDataCountsHandler }