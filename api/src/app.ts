import express from 'express';
import indexRouter from '@src/routes';

const app = express();

// api router
app.use('/api', indexRouter);

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