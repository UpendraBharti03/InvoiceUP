import mongoose from "mongoose";
import { TListParams, TPaginatedResponse } from "@src/@types/common";
import Invoice, { EInvoiceStatus, IInvoice } from "@src/features/invoice/invoice.model";
import { prepareSearchFilterArray } from "@src/utils/helpers";

export const createInvoice = async ({payload, session}: {payload: Omit<IInvoice, "_id">, session?: any}) => {
    const invoiceObj = await Invoice.create([payload], {session});
    return invoiceObj[0];
}

export const getInvoiceDetails = async ({_id}: {_id: mongoose.Types.ObjectId}) => {
    const invoice = await Invoice.findById({_id});
    return invoice;
}

export const updateInvoice = async ({_id, payload}: {_id: mongoose.Types.ObjectId; payload: Partial<IInvoice>}) => {
    const invoiceObj = await Invoice.findOneAndUpdate({_id}, payload, {new: true});
    return invoiceObj;
}

export const updateInvoiceStatus = async ({_id, status}: {_id: mongoose.Types.ObjectId; status: EInvoiceStatus}) => {
    const invoiceObj = await updateInvoice({_id, payload: {status}});
    return invoiceObj;
}

export const deleteInvoiceById = async ({_id}: {_id: mongoose.Types.ObjectId}) => {
    const customerObj = await Invoice.findOneAndUpdate({ _id }, { isDeleted: true }, { new: true });
    return customerObj;
}

export const getInvoicesList = async ({ search = "", page = 1, limit = 10, filter = {}, staticFilter = {} }: TListParams<Pick<IInvoice, "customer"> | {}, Pick<IInvoice, "userId"> | {}>) => {
    const searchRegex = new RegExp(search, 'gi');
    const skip = limit === "ALL" ? 0 : (page - 1) * limit;

    const matchFilter: any = {
        $or: prepareSearchFilterArray({
            keys: ["customer.name.fullName"],
            regex: searchRegex,
        }),
    };
    Object.entries(filter).forEach(([key, value]) => {
        matchFilter[key] = value;
    });

    const pipeline: any[] = [
        {
            $match: {
                ...matchFilter,
                ...staticFilter,
            },
        },
        {
            $sort: {
                _id: -1,
            },
        },
    ];
    const paginationPipeline = [
        {
            $skip: skip,
        },
        ...(limit === "ALL" ? [] : [{
            $limit: limit,
        }]),
    ];
    const countPipeline = [
        {
            $count: 'totalResults',
        },
    ];

    const results = await Invoice.aggregate([...pipeline, ...paginationPipeline]);
    const totalResponse = await Invoice.aggregate([...pipeline, ...countPipeline]);
    const totalResults = totalResponse?.[0]?.totalResults ?? 0;
    const totalPages = limit === "ALL" ? 1 : Math.ceil(totalResults / limit);
    const fromTo = {
        from: limit === "ALL" ? 1 : page == 1 ? page : page * limit + 1 - limit,
        to: limit === "ALL" ? totalPages : page == 1 ? limit : page == totalPages ? totalResults : page * limit,
    };

    const data: TPaginatedResponse<IInvoice> = {
        results,
        totalResults,
        totalPages,
        page,
        fromTo,
        resultsInCurrentPage: results.length,
    };

    return data;
}

export const getInvoicesCount = async ({staticFilter = {}}: {staticFilter: Pick<IInvoice, "userId" | "isDeleted"> | {}}) => {
    const pipeline: any[] = [
        {
            $match: {
                ...staticFilter,
            },
        },
        {
            $sort: {
                _id: -1,
            },
        },
    ];
    const countPipeline = [
        {
            $count: 'totalResults',
        },
    ];
    const totalResponse = await Invoice.aggregate([...pipeline, ...countPipeline]);
    const totalResultsCount = totalResponse?.[0]?.totalResults ?? 0;
    return totalResultsCount;
}