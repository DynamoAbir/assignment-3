import { model, Schema, Query } from "mongoose";
import { IFacilityModel, TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility, IFacilityModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

facilitySchema.post("save", async function (doc: any, next) {
  delete doc._doc.isDeleted;
  next();
});
facilitySchema.statics.isFacilityExists = async function (id: string) {
  const existingFacility = await Facility.findOne({
    _id: id,
    isDeleted: { $ne: true },
  }).select("-isDeleted");
  return existingFacility;
};
// facilitySchema.pre("find", function (next) {
//   this.find({ isDeleted: { $ne: true } }).select("-isDeleted");
// });
export const Facility = model<TFacility, IFacilityModel>(
  "Facility",
  facilitySchema
);
