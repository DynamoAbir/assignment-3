// src/types/express.d.ts or @types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // or the specific type you are using for the user payload
    }
  }
}
declare module "express-serve-static-core" {
  interface Request {
    user?: { userId: string; role: TUserRole };
  }
}
