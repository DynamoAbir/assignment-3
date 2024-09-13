import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Facility } from "../facility/facility.model";
import { Booking } from "./booking.model";
import { JwtPayload } from "jsonwebtoken";
import { TBookingDetails } from "./booking.interface";

const checkAvailability = async (facilityId: string, date: string) => {
  const bookings = await Booking.find({ facilityId, date });

  const totalSlots = [
    { startTime: "02:00", endTime: "04:00" },
    { startTime: "04:00", endTime: "06:00" },
    { startTime: "06:00", endTime: "08:00" },
    { startTime: "08:00", endTime: "10:00" },
    { startTime: "10:00", endTime: "12:00" },
  ];

  // Convert slot time strings into Date objects for comparison
  const availableSlots = totalSlots.filter((slot) => {
    // Create Date objects for slot start and end times
    const slotStartTime = new Date(`${date}T${slot.startTime}`);
    const slotEndTime = new Date(`${date}T${slot.endTime}`);

    return !bookings.some((booking) => {
      const bookingStartTime = new Date(booking.startTime);
      const bookingEndTime = new Date(booking.endTime);

      // Compare both as Date objects
      return bookingStartTime < slotEndTime && bookingEndTime > slotStartTime;
    });
  });

  return availableSlots;
};

const createBookingIntoDB = async (
  userId: string,
  bookingDetails: TBookingDetails
) => {
  const facility = await Facility.findById(bookingDetails.facilityId);
  if (!facility) {
    throw new AppError(httpStatus.BAD_REQUEST, "Facility Not Found");
  }
  const startTime = new Date(bookingDetails.startTime);
  const endTime = new Date(bookingDetails.endTime);

  if (endTime <= startTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End Time must be after start time"
    );
  }
  const durtaionHours =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  const payableAmount = durtaionHours * facility.pricePerHour;

  const booking = new Booking({
    date: bookingDetails.date,
    startTime: bookingDetails.startTime,
    endTime: bookingDetails.endTime,
    facilityId: bookingDetails.facilityId,
    userId,
    payableAmount,
    isBooked: "confirmed",
  });

  return await booking.save();
};

// const createBooking2 = async (userId: string, bookingDate: any) => {
//   if (!userId) {
//     throw new AppError(httpStatus.BAD_REQUEST, "User ID is required");
//   }

//   const facility = await Facility.findById();
//   if (!facility) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Facility not found");
//   }

//   const durationHours =
//     (new Date(bookingDate.endTime).getTime() -
//       new Date(bookingDate.startTime).getTime()) /
//     (1000 * 60 * 60);
//   const payableAmount = durationHours * facility.pricePerHour;

//   const booking = new Booking({
//     ...bookingDate,
//     user: userId,
//     payableAmount,
//     isBooked: "confirmed",
//   });

//   return await booking.save();
// };

// const getBookingsByUser = async (userId: string) => {
//   return await Booking.find({ user: userId }).populate("facility");
// };
// const getAllBooking = async () => {
//   return await Booking.find().populate("facility").populate("user");
// };
// const cancelBooking = async (bookingId: string) => {
//   const booking = await Booking.findByIdAndUpdate(
//     bookingId,
//     { isBooked: "canceled" },
//     { new: true }
//   );
//   return booking;
// };

export const BookingServics = {
  checkAvailability,
  createBookingIntoDB,
  // createBooking,
  // getBookingsByUser,
  // cancelBooking,
  // getAllBooking,
};
