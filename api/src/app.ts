import express from 'express';
import httpStatus from "http-status";
import cors from 'cors';
import indexRouter from '@src/routes';
import ApiError from '@src/utils/ApiError';
import { errorConverter, errorHandler } from '@src/middlewares/error';

const app = express();

// parse json request body
app.use(express.json({ limit: '50mb' }));

// enable cors
app.use(cors());
app.options('*', cors());

// api router
app.use('/api', indexRouter);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


// common json response handler.
app.response.sendJSONResponse = function ({ code = 200, success = true, message = '', data = {} }) {
    return this.status(code).json({
        code,
        success,
        message,
        data,
    });
};

export default app;