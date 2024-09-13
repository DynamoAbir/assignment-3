import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    facilityId: {
      type: Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
    payableAmount: { type: Number, required: true },

    isBooked: {
      type: String,
      enum: ["confirmed", "unconfirmed", "canceled"],
      default: "unconfirmed",
    },
  },
  { timestamps: true }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
