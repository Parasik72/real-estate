import container from "../container";
import { GetUserProfileParams } from "../params/user.params";
import { UserService } from "../services/user.service";
import { SignUpDto } from "../dto/user/sign-up.dto";
import { HttpException } from "../exceptions/http.exception";
import bcryptjs from 'bcryptjs';
import { v4 } from "uuid";
import { UUID } from "crypto";
import { ControllerConfig } from "../types/controller.types";

export class UserController {
    async getUserProfileById({ query }: ControllerConfig<{}, GetUserProfileParams>) {
        const userService = container.resolve<UserService>('userService');
        const user = await userService.getUserProfileById(query.userId);
        if (!user) throw new HttpException('The user was not found', 404);
        return user; 
    }

    async signIn() {
        return { message: 'Successful sign in!' };
    }

    async signUp({ body }: ControllerConfig<SignUpDto>) {
        const userService = container.resolve<UserService>('userService');
        const emailInUse = await userService.getUserByEmail(body.email);
        if (emailInUse) throw new HttpException('This email is already in use', 400);
        const userId = v4() as UUID;
        const hashPassword = bcryptjs.hashSync(body.password, 5);
        const time = BigInt(new Date().getTime());
        await userService.createUser({
            ...body,
            userId,
            password: hashPassword,
            createdAt: time,
            updatedAt: time
        });
        return { message: 'Successful sign up!' };
    }
}