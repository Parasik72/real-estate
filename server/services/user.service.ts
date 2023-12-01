import { Property } from "@/db/models/property";
import { PropertyAddress } from "@/db/models/propertyaddress";
import { User } from "@/db/models/user";
import { UserProfile } from "../types/user.types";
import { InferCreationAttributes } from "sequelize";

export class UserService {
    async getUserByEmail(email: string): Promise<User | null>  {
        return User.findOne({ where: { email } });
    }

    async getUserById(userId: string): Promise<User | null> {
        return User.findByPk(userId);
    }

    async getUserProfileById(userId: string): Promise<UserProfile | null>  {
        return User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Property, include: [{ model: PropertyAddress }] }
            ]
        }) as Promise<UserProfile | null>;
    }

    async createUser(data: InferCreationAttributes<User>): Promise<User> {
        return User.create(data);
    }
}