import { Request, Response, Router } from "express";

import { BookingValidationSchemas } from "./booking.validation";
import { bookingControllers } from "./booking.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../auth/auth.constant";
import validateRequiest from "../../middlewares/validateRequiest";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Bookings");
});

router.get(
  "/check-availability/:facilityId",
  validateRequiest(BookingValidationSchemas.checkAvailabilitySchema), // Validate first
  bookingControllers.checkFacilityAvalability // Then invoke controller
);

router.post(
  "/bookings",
  auth(USER_ROLE.user),
  validateRequiest(BookingValidationSchemas.createBookingValidationSchema),
  bookingControllers.createNewBooking2
);

router.get(
  "/all-bookings",
  auth(USER_ROLE.admin),
  bookingControllers.getAllBooking
);

router.get(
  "/:userId",
  auth(USER_ROLE.user),
  bookingControllers.getUserBookings
);

router.delete(
  "/delete-booking/:id",
  auth(USER_ROLE.user),
  bookingControllers.cancelUserBooking
);

export const BookingRoutes = router;
