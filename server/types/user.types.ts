import { User } from "@/db/models/user";
import { PropertyWithAddress } from "./properties.types";

export type UserProfile = User & { Properties: PropertyWithAddress[] };