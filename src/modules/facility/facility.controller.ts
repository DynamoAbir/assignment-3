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
const getSignleFacility = catchAsync(async (req, res) => {
  const reuslt = await FacilityServices.getSignleFacilityFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility Retrived Successfully",
    data: reuslt,
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

const updateFacility = catchAsync(async (req, res) => {
  const result = await FacilityServices.updateFacilityIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility updated successfully",
    data: result,
  });
});
const deleteFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.deleteFacilityFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Facility deleted successfully",
    data: result,
  });
});

export const FacilityController = {
  addFacility,
  getAllFacilities,
  updateFacility,
  deleteFacility,
  getSignleFacility,
};
