import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

const validateRequiest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("Request body:", req.body); // Add this line
    console.log("Request params:", req.params); // Add this line
    console.log("Request query:", req.query); // Add this line
    await schema.parseAsync({
      body: req.body,
      params: req.params, // Added params
      query: req.query, // Added query
    });
    next();
  });
};

export default validateRequiest;
