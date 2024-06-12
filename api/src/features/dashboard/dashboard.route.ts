import express from "express";
import catchAsync from "@src/utils/catchAsync";
import { authenticate } from "@src/features/auth/auth.middleware";
import dashboardController from "@src/features/dashboard/dashboard.controller";

const router = express.Router();

// Analytics data for dashboard route
router.get('/', authenticate, catchAsync(dashboardController?.getAnalyticsDataCountsHandler));

export default router;
