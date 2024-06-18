import express from "express";
import healthCheckRoute from "@src/features/healthCheck/healthCheck.route";
import authRoute from "@src/features/auth/auth.route";
import userProfileRoute from "@src/features/userProfile/userProfile.route";
import productRoute from "@src/features/product/product.route";
import customerRoute from "@src/features/customer/customer.route";
import invoiceRoute from "@src/features/invoice/invoice.route";
import dashboardRoute from "@src/features/dashboard/dashboard.route";

const router = express.Router()

const routes = [
  {
    path: '/health-check',
    route: healthCheckRoute
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/profile',
    route: userProfileRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/customer',
    route: customerRoute,
  },
  {
    path: '/invoice',
    route: invoiceRoute,
  },
  {
    path: '/dashboard',
    route: dashboardRoute,
  },
]

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
