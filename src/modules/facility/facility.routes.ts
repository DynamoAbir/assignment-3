import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../auth/auth.constant";
import validateRequiest from "../../middlewares/validateRequiest";
import { FacilityValidationSchemas } from "./facility.validation";
import { FacilityController } from "./facility.controller";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequiest(FacilityValidationSchemas.createFacilityValidationSchema),
  FacilityController.addFacility
);

router.get("/", FacilityController.getAllFacilities);

export const FacilityRoutes = router;
