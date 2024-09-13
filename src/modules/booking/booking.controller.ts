import httpStatus from "http-status";

import sendResponse from "../../utils/sendResponse";

import { BookingServics } from "./booking.service";
import catchAsync from "../../utils/catchAsync";
import { BookingValidationSchemas } from "./booking.validation";

const checkFacilityAvalability = catchAsync(async (req, res) => {
  const validation = BookingValidationSchemas.checkAvailabilitySchema.safeParse(
    {
      params: req.params,
      query: req.query,
    }
  );

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid input",
      errors: validation.error.errors,
    });
  }
  const { facilityId } = req.params;
  console.log(
    "Url theke Facility Id Pawa gese. eta holo facility id",
    facilityId
  );
  const { date } = req.query;
  console.log(
    "Url theke Date Pawa gese jeta qery te disi. eta holo facility id"
  );
  const availableSlots = await BookingServics.checkAvailability(
    facilityId,
    date as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability checked successfully",
    data: availableSlots,
  });
});

const createNewBooking2 = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const bookingDetails = req.body;
  console.log(req.body);
  const booking = await BookingServics.createBookingIntoDB(
    userId as string,
    bookingDetails
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking is created successfully",
    data: booking,
  });
});

// const createNewBooking = catchAsync(async (req, res) => {
//   console.log("User from req.user:", req.user); // Add this to debug
//   if (!req.user || !req.user._id) {
//     return res.status(400).json({
//       success: false,
//       statusCode: 400,
//       message: "User ID is required",
//     });
//   }

//   const booking = await BookingServics.createBooking(req.user._id, req.body);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Booking created successfully",
//     data: booking,
//   });
// });

const getUserBookings = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const bookings = await BookingServics.getBookingsByUser(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const bookings = await BookingServics.getAllBooking();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: bookings,
  });
});

const cancelUserBooking = catchAsync(async (req, res) => {
  const booking = await BookingServics.cancelBooking(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking canceled successfully",
    data: booking,
  });
});

export const bookingControllers = {
  cancelUserBooking,
  getAllBooking,

  checkFacilityAvalability,
  createNewBooking2,
  getUserBookings,
};
