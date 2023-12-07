import { IUser, UserProfile } from "../types/user.types";
import BaseContext from "../context/base-context";
import { InferCreationAttributes } from "sequelize";

export class UserService extends BaseContext {
    async getUserByEmail(email: string): Promise<IUser | null>  {
        return this.di.User.findOne({ where: { email } });
    }

    async getUserById(userId: string): Promise<IUser | null> {
        return this.di.User.findByPk(userId);
    }

    async getUserProfileById(userId: string): Promise<UserProfile | null>  {
        return this.di.User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [
                { model: this.di.Property, include: [{ model: this.di.PropertyAddress }] }
            ]
        }) as Promise<UserProfile | null>;
    }

    async createUser(data: InferCreationAttributes<IUser>): Promise<IUser> {
        return this.di.User.create(data);
    }
}