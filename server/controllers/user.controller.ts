import { sessions } from "../sessions";
import { passportAuthenticate, passportInitialize } from "../passport";
import container from "../container";
import { GetUserProfileParams } from "../params/user.params";
import { SignUpDto } from "../dto/user/sign-up.dto";
import { HttpException } from "../exceptions/http.exception";
import bcryptjs from 'bcryptjs';
import { v4 } from "uuid";
import { UUID } from "crypto";
import type { ControllerConfig } from "../types/controller.types";
import { BaseController } from "../base-controller";
import POST from "../decorators/post.decorator";
import GET from "../decorators/get.decorator";
import SSR from "../decorators/ssr.decorator";
import USE from "../decorators/use.decorator";
import { UserService } from "../services/user.service";

export class UserController extends BaseController {
    @SSR('/user/profile/:userId')
    @GET('/api/user/profile/:userId')
    async getUserProfileById({ query }: ControllerConfig<{}, GetUserProfileParams>) {
        const userService = container.resolve<UserService>('userService');
        const user = await userService.getUserProfileById(query.userId);
        if (!user) throw new HttpException('The user was not found', 404);
        return user; 
    }

    @USE([sessions, passportInitialize, passportAuthenticate])
    @POST('/api/user/sign-in')
    async signIn() {
        return { message: 'Successful sign in!' };
    }

    @POST('/api/user/sign-up')
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