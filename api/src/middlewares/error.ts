import mongoose from "mongoose";
import httpStatus from "http-status";

import {config} from "@src/config/config";
import logger from "@src/config/logger";
import ApiError from "@src/utils/ApiError";

export const errorConverter = (err: any, req: any, res: any, next: any) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: any, req: any, res: any, next: any) => {
    let {statusCode, message} = err;
    if (config.env === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(config.env === 'development' && {stack: err.stack}),
    };

    if (config.env === 'development') {
        logger.error(err);
    }

    return res.sendJSONResponse({
        code: statusCode,
        message,
        success: false,
        data: config.env === 'development' ? {
            stack: err.stack
        } : {}
    })
};
