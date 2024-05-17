import {Request, Response, NextFunction} from 'express'

const getHealthCheck = async (req: Request, res: Response, next: NextFunction) => {
    return res.sendJSONResponse({
        message: 'Healthy!!',
    });
}

export default {getHealthCheck};