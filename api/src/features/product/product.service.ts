import Product, { IProduct } from "@src/features/product/product.model";
import { TPaginatedResponse, TListParams } from "@src/@types/common"; 
import { prepareSearchFilterArray } from "@src/utils/helpers";
import mongoose from 'mongoose';

export const createProduct = async ({payload, session}: {payload: Omit<IProduct, "_id">, session?: any}) => {
    const productObj = await Product.create([payload], {session});
    return productObj[0];
}

export const getProductDetails = async ({_id}: {_id: mongoose.Types.ObjectId}) => {
    const product = await Product.findById({_id});
    return product;
}

export const updateProduct = async ({_id, payload}: {_id: mongoose.Types.ObjectId; payload: Partial<IProduct>}) => {
    const productObj = await Product.findOneAndUpdate({_id}, payload, {new: true});
    return productObj;
}

export const deleteProductById = async ({_id}: {_id: mongoose.Types.ObjectId}) => {
    const customerObj = await Product.findOneAndUpdate({ _id }, { isDeleted: true }, { new: true });
    return customerObj;
}

export const getProductsList = async ({search = "", page = 1, limit = 10, filter = {}, staticFilter = {}}: TListParams<Pick<IProduct, "productName" | "productDescription"> | {}, Pick<IProduct, "userId"> | {}>) => {
    const searchRegex = new RegExp(search, 'gi');
    const skip = limit === "ALL" ? 0 : (page - 1) * limit;

    const matchFilter: any = {
        $or: prepareSearchFilterArray({
            keys: ["productName", "productDescription"],
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
        // {
        //     $project: {
        //         userId: 0,
        //     },
        // },
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

    const results = await Product.aggregate([...pipeline, ...paginationPipeline]);
    const totalResponse = await Product.aggregate([...pipeline, ...countPipeline]);
    const totalResults = totalResponse?.[0]?.totalResults ?? 0;
    const totalPages = limit === "ALL" ? 1 : Math.ceil(totalResults / limit);
    const fromTo = {
        from: limit === "ALL" ? 1 : page == 1 ? page : page * limit + 1 - limit,
        to: limit === "ALL" ? totalResults : page == 1 ? limit : page == totalPages ? totalResults : page * limit,
    };

    const data: TPaginatedResponse<IProduct> = {
        results,
        totalResults,
        totalPages,
        page,
        fromTo,
        resultsInCurrentPage: results.length,
    };

    return data;
}

export const getProductsCount = async ({staticFilter = {}}: {staticFilter: Pick<IProduct, "userId" | "isDeleted"> | {}}) => {
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
    const totalResponse = await Product.aggregate([...pipeline, ...countPipeline]);
    const totalResultsCount = totalResponse?.[0]?.totalResults ?? 0;
    return totalResultsCount;
}