import { CreateUser, IUser, UpdateUserProfile } from "../types/user.types";
import BaseContext from "../context/base-context";
import { InferCreationAttributes } from "sequelize";
import { v4 } from "uuid";
import { UUID } from "crypto";
import bcryptjs from 'bcryptjs';

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
        });
    }

    async createUser(body: CreateUser): Promise<IUser> {
        const userId = v4() as UUID;
        const hashPassword = bcryptjs.hashSync(body.password, 5);
        const time = BigInt(new Date().getTime());
        return this.di.User.create({
            ...body,
            userId,
            password: hashPassword,
            createdAt: time,
            updatedAt: time
        });
    }

    async editProfile(userId: string, data: UpdateUserProfile) {
        const updatedAt = BigInt(new Date().getTime());
        return this.di.User.update({...data, updatedAt}, {
            where: { userId }
        });
    }
}