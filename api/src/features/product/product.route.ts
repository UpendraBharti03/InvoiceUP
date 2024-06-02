import express from "express";
import { validate } from "@src/middlewares/validate";
import catchAsync from "@src/utils/catchAsync";
import { authenticate } from "@src/features/auth/auth.middleware";
import productController from "@src/features/product/product.controller";
import { createProductValidation } from "@src/features/product/product.validation";

const router = express.Router();

// create product route
router.post('/create', authenticate, validate(createProductValidation), catchAsync(productController?.createProductHandler));

export default router;
