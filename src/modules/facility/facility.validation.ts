import { z } from "zod";

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be in string format",
      })
      .min(1, { message: "Name is required" }),
    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be in string format",
      })
      .min(1, { message: "Description is required" }),
    pricePerHour: z
      .number({
        required_error: "Price per hour is required",
        invalid_type_error: "Price per hour must be a number",
      })
      .positive({ message: "Price per hour must be a positive number" }),
    location: z
      .string({
        required_error: "Location is required",
        invalid_type_error: "Location must be in string format",
      })
      .min(1, { message: "Location is required" }),
    isDeleted: z.boolean().optional(),
  }),
});

const updateFacilityValidationSchema = z.object({});

export const FacilityValidationSchemas = {
  createFacilityValidationSchema,
};
