import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/auth/auth.interface";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import config from "../config";

// Middleware to handle authentication and authorization
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized: Token is missing",
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
      console.error("JWT verification error:", error); // Log verification errors
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized: Invalid token",
      });
    }

    const { userId, role } = decoded;

    // Ensure the token contains both userId and role
    if (!userId || !role) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized: Missing user information in token",
      });
    }

    // Check if the user exists
    const user = await User.isUserExist(userId);
    if (!user) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "User not found or unauthorized",
      });
    }

    // Check if the user's role is authorized for this action
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "Access forbidden: You do not have the required role",
      });
    }

    // Attach user data to the request object (ensure it follows the correct structure)
    req.user = { userId, role };
    next();
  });
};

export default auth;
