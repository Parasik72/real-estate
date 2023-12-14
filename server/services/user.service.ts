import { IUser, UpdateUserProfile } from "../types/user.types";
import BaseContext from "../context/base-context";
import { InferCreationAttributes } from "sequelize";

export class UserService extends BaseContext {
    async getUserByEmail(email: string): Promise<IUser | null>  {
        return this.di.User.findOne({ where: { email } });
    }

    async getUserById(userId: string): Promise<IUser | null> {
        return this.di.User.findByPk(userId);
    }

    async getUserProfileById(userId: string)
    : Promise<IUser | null>  {
        return this.di.User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        }) as Promise<IUser | null>;
    }

    async createUser(data: InferCreationAttributes<IUser>): Promise<IUser> {
        return this.di.User.create(data);
    }

    async editProfile(userId: string, data: UpdateUserProfile) {
        return this.di.User.update(data, {
            where: { userId }
        });
    }
}