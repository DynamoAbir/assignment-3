import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { FacilityRoutes } from "../modules/facility/facility.routes"; // Fix the incomplete import

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: AuthRoutes,
  },
  {
    path: "/facilities",
    route: FacilityRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
