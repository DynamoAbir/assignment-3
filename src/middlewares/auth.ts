import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/auth/auth.interface";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import config from "../config";

const auth = (...requireRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }

    let decoded: JwtPayload;
    try {
      // Verify the token using the secret key from the config
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }

    const { userId, role } = decoded;

    // Check if the user exists
    const user = await User.isUserExist(userId);
    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });
    }

    // Check if the user role is authorized
    if (requireRoles.length && !requireRoles.includes(role)) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "You have no access to this route",
      });
    }

    // Attach user data to request object
    req.user = decoded;
    next();
  });
};

export default auth;
