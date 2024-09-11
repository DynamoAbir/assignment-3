import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacilityServices } from "./facility.service";

const addFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.createFacilityIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility Added successfully",
    data: result,
  });
});

const getAllFacilities = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilityFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facilites Retrived Successfully",
    data: result,
  });
});

export const FacilityController = {
  addFacility,
  getAllFacilities,
};
