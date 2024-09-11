import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid User");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, "User is deleted");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Password");
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  if (!config.jwt_access_secret) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "JWT secret key is missing"
    );
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: "30d",
  });

  const { isDeleted, password, ...restData } = user.toObject();

  return {
    accessToken,
    restData,
  };
};

export const AuthService = {
  createUserIntoDB,
  loginUser,
};
