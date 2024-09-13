import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const getAllFacilityFromDB = async () => {
  const result = await Facility.find();
  return result;
};
const getSignleFacilityFromDB = async (id: string) => {
  const result = await Facility.findById(id);
  return result;
};
const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>
) => {
  const facility = await Facility.isFacilityExists(id);

  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "No Facility Found");
  }
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    projection: {
      isDeleted: 0,
    },
  });
  return result;
};
const deleteFacilityFromDB = async (id: string) => {
  const facility = await Facility.findById(id);
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, projection: { isDeleted: 0 } }
  );
  return result;
};
export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilityFromDB,
  updateFacilityIntoDB,
  getSignleFacilityFromDB,
  deleteFacilityFromDB,
};
