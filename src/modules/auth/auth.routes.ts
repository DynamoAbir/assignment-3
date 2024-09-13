import { Request, Response, Router } from "express";
import validateRequiest from "../../middlewares/validateRequiest";
import { AuthValidationSchema } from "./auth.validation";
import { AuthControllers } from "./auth.controller";

const router = Router();
router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Rockland");
});
router.post(
  "/signup",

  validateRequiest(AuthValidationSchema.signupValidationSchema),
  AuthControllers.createUser
);

router.post(
  "/login",
  validateRequiest(AuthValidationSchema.loginSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
