import express from "express";
import { validate } from "@src/middlewares/validate";
import catchAsync from "@src/utils/catchAsync";
import { authenticate } from "@src/features/auth/auth.middleware";
import productController from "@src/features/product/product.controller";
import { createProductValidation, updateProductValidation } from "@src/features/product/product.validation";

const router = express.Router();

// create product route
router.post('/create', authenticate, validate(createProductValidation), catchAsync(productController?.createProductHandler));

// update product route
router.put('/:_id', authenticate, validate(updateProductValidation), catchAsync(productController?.updateProductHandler));

// get product details route
router.get('/', authenticate, validate(updateProductValidation), catchAsync(productController?.getProductDetailsHandler));


export default router;
