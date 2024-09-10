import { Router } from "express";
import validateRequiest from "../../middlewares/validateRequiest";
import { AuthValidationSchema } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post(
  "/signup",

  validateRequiest(AuthValidationSchema.signupValidationSchema),
  AuthControllers.createUser
);

export const AuthRoutes = router;
