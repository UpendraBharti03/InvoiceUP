import express from "express";
import catchAsync from "@src/utils/catchAsync";
import { validate } from "@src/middlewares/validate";
import { authenticate } from "@src/features/auth/auth.middleware";
import invoiceController from "@src/features/invoice/invoice.controller";
import { createInvoiceValidation } from "@src/features/invoice/invoice.validation";

const router = express.Router();

// create invoice route
router.post('/create', authenticate, validate(createInvoiceValidation), catchAsync(invoiceController?.createInvoiceHandler));

// update invoice route
// router.put('/:_id', authenticate, validate(updateInvoiceValidation), catchAsync(invoiceController?.updateInvoiceHandler));

// get invoice details route
// router.get('/', authenticate, validate(getInvoiceDetailsValidation), catchAsync(invoiceController?.getInvoiceDetailsHandler));

// delete invoice route
// router.put('/delete/:_id', authenticate, catchAsync(invoiceController?.deleteInvoiceHandler));

// Invoices list route
// router.post('/list', authenticate, validate(getInvoicesListValidation), catchAsync(invoiceController?.getInvoicesListHandler));

export default router;
