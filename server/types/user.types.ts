import type { UUID } from "crypto";
import type { PropertyWithAddress } from "./properties.types";
import type { Model } from "sequelize";
export interface IUser extends Model {
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

export interface UpdateUserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}