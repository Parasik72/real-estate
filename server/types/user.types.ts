import { UUID } from "crypto";
import { PropertyWithAddress } from "./properties.types";
import { Model } from "sequelize";
export interface IUser extends Model<IUser, IUser> {
  userId: UUID;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  createdAt: BigInt;
  updatedAt: BigInt;
}

export type UserProfile = IUser & { Properties: PropertyWithAddress[] };