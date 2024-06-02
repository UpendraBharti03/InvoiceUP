import niv from "node-input-validator";
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { isObject } from "@src/utils/helpers";

niv.bailable(false);

interface IValidationItem {
    rules: object,
    messages?: object,
    niceNames?: object
}

export interface ValidateMiddlewareParams {
    body: IValidationItem
}

interface IErrorItem {
    message: string,
    rule: string
}

interface IErrors {
    [key: string]: Array<IErrorItem>
}

const nivErrorsToString = (errors:IErrors)=>{
    let errorMsg = "";
    Object.values(errors).forEach((errArr: Array<IErrorItem>) =>{
        errArr.forEach((errObj:IErrorItem)=> {
            errorMsg += " " + errObj.message
        })
    })
    return errorMsg
}

export const validate = (params:ValidateMiddlewareParams) => async (req: Request, res: Response, next: NextFunction) => {
    const {body} = params;
    if(isObject(body)){
        const {rules, messages, niceNames} = body;
        const validator = new niv.Validator(req.body ?? {}, rules);
        if(isObject(messages) && niceNames){
            validator.niceNames(niceNames)
        }
        if(isObject(messages)){
            validator.customMessages(messages)
        }
        const matched = await validator.check();
        if(!matched){
            return res.sendJSONResponse({
                code: httpStatus.BAD_REQUEST,
                success: false,
                message: nivErrorsToString(validator.errors),
                data:{
                    errors: validator.errors
                }
            })
        }
        next()
    }
}