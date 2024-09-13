import { Types } from "mongoose";

export type TBooking = {
  date: Date;
  startTime: Date;
  endTime: Date;
  userId: Types.ObjectId;
  facilityId: Types.ObjectId;
  payableAmount: number;
  isBooked: "confirmed" | "unconfirmed" | "canceled";
};

export type TBookingDetails = {
  facilityId: Types.ObjectId;
  date: Date;
  startTime: Date;
  endTime: Date;
};
