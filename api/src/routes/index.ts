import express from "express";
import healthCheckRoute from "@src/features/healthCheck/healthCheck.route";

const router = express.Router()

const routes = [
  {
    path: '/health-check',
    route: healthCheckRoute
  }
]

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
