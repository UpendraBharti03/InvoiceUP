import {Request, Response, NextFunction} from 'express'

const getHealthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.sendJSONResponse({
        message: 'Healthy!!',
    });
}

export default {getHealthCheck};