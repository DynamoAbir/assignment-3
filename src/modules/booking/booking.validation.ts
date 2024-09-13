import { z } from "zod";

// Schema for creating a new booking
const createBookingValidationSchema = z.object({
  body: z.object({
    facilityId: z.string().min(1, { message: "Facility is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    startTime: z.string().min(1, { message: "Start time is required" }),
    endTime: z.string().min(1, { message: "End time is required" }),
  }),
});

// Schema for checking availability
const checkAvailabilitySchema = z.object({
  params: z.object({
    facilityId: z.string().min(1, "Facility ID is required"), // Validating facilityId in params
  }),
  query: z.object({
    date: z.string().optional(), // Optional query parameter
  }),
});

export const BookingValidationSchemas = {
  createBookingValidationSchema,
  checkAvailabilitySchema,
};
