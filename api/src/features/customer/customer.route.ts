import express from "express";
import { validate } from "@src/middlewares/validate";
import catchAsync from "@src/utils/catchAsync";
import { authenticate } from "@src/features/auth/auth.middleware";
import customerController from "@src/features/customer/customer.controller";
import { createCustomerValidation, updateCustomerValidation, getCustomerDetailsValidation, getCustomersListValidation } from "@src/features/customer/customer.validation";

const router = express.Router();

// create customer route
router.post('/create', authenticate, validate(createCustomerValidation), catchAsync(customerController?.createCustomerHandler));

// update customer route
router.put('/:_id', authenticate, validate(updateCustomerValidation), catchAsync(customerController?.updateCustomerHandler));

// get customer details route
router.get('/', authenticate, validate(getCustomerDetailsValidation), catchAsync(customerController?.getCustomerDetailsHandler));

// delete customer route
router.put('/delete/:_id', authenticate, catchAsync(customerController?.deleteCustomerHandler));

// customers list route
router.post('/list', authenticate, validate(getCustomersListValidation), catchAsync(customerController?.getCustomersListHandler));

export default router;
