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
    body?: IValidationItem;
    query?: IValidationItem;
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

const nivValidator = async ({validationInput, validationParam}: {validationInput: any; validationParam: IValidationItem}) => {
    const {rules, messages, niceNames} = validationParam;
    const validator = new niv.Validator(validationInput ?? {}, rules);
    if(isObject(messages) && niceNames){
        validator.niceNames(niceNames)
    }
    if(isObject(messages)){
        validator.customMessages(messages)
    }
    const matched = await validator.check();
    return {matched, validator};
}

export const validate = (params:ValidateMiddlewareParams) => async (req: Request, res: Response, next: NextFunction) => {
    const {body, query} = params;
    if(body && isObject(body)){
        const {matched, validator} = await nivValidator({validationInput: req.body, validationParam: body});
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
        
    }
    if (query && isObject(query)) {
        const {matched, validator} = await nivValidator({validationInput: req.query, validationParam: query});
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
    }
    next()
}