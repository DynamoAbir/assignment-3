import { Model } from "mongoose";

export type TFacility = {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted?: boolean;
};

export interface IFacilityModel extends Model<TFacility> {
  isFacilityExists(id: string): Promise<TFacility | null>;
}
