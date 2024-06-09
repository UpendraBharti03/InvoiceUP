import { TListParams, TPaginatedResponse } from "@src/@types/common";
import Customer, { ICustomer } from "@src/features/customer/customer.model";
import { prepareSearchFilterArray } from "@src/utils/helpers";
import mongoose from "mongoose";

export const createCustomer = async ({payload, session}: {payload: Omit<ICustomer, "_id">, session?: any}) => {
    const customer = await Customer.create([payload], {session});
    return customer[0];
}

export const updateCustomer = async ({_id, payload}: {_id: mongoose.Types.ObjectId; payload: Partial<ICustomer>}) => {
    const updatedCustomer = await Customer.findOneAndUpdate({_id}, payload, {new: true});
    return updatedCustomer;
}

export const getCustomerDetails = async ({_id}: {_id: mongoose.Types.ObjectId}) => {
    const customer = await Customer.findById({_id});
    return customer;
}

export const deleteCustomerById = async ({_id}: {_id: mongoose.Types.ObjectId}) => {
    const customerObj = await Customer.findOneAndUpdate({ _id }, { isDeleted: true }, { new: true });
    return customerObj;
}

export const getCustomersList = async ({search = "", page = 1, limit = 10, filter = {}, staticFilter = {}}: TListParams<Pick<ICustomer, "name" | "email"> | {}, Pick<ICustomer, "userId" | "isDeleted"> | {}>) => {
    const searchRegex = new RegExp(search, 'gi');
    const skip = (page - 1) * limit;

    const matchFilter: any = {
        $or: prepareSearchFilterArray({
            keys: ["name.fullName", "email"],
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
        {
            $limit: limit,
        },
    ];
    const countPipeline = [
        {
            $count: 'totalResults',
        },
    ];

    const results = await Customer.aggregate([...pipeline, ...paginationPipeline]);
    const totalResponse = await Customer.aggregate([...pipeline, ...countPipeline]);
    const totalResults = totalResponse?.[0]?.totalResults ?? 0;
    const totalPages = Math.ceil(totalResults / limit);
    const fromTo = {
        from: page == 1 ? page : page * limit + 1 - limit,
        to: page == 1 ? limit : page == totalPages ? totalResults : page * limit,
    };

    const data: TPaginatedResponse<ICustomer> = {
        results,
        totalResults,
        totalPages,
        page,
        fromTo,
        resultsInCurrentPage: results.length,
    };

    return data;
}