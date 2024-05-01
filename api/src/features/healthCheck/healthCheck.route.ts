import express from 'express'
import healthCheckController from "@src/features/healthCheck/healthCheck.controller";
import catchAsync from "@src/utils/catchAsync";

const router = express.Router()

// Health check route
router.get('/', catchAsync(healthCheckController?.getHealthCheck))

export default router
