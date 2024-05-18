import express from "express";
import healthCheckRoute from "@src/features/healthCheck/healthCheck.route";
import authRoute from "@src/features/auth/auth.route";

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
]

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
