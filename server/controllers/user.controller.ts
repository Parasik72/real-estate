import { sessions } from "../sessions";
import { passportAuthenticate, passportInitialize, passportSession } from "../passport";
import { GetUserProfileParams } from "../params/user.params";
import { SignUpDto } from "../dto/user/sign-up.dto";
import { HttpException } from "../exceptions/http.exception";
import bcryptjs from 'bcryptjs';
import { v4 } from "uuid";
import { UUID } from "crypto";
import type { ControllerConfig } from "../types/controller.types";
import { BaseController } from "./base-controller";
import POST from "../decorators/post.decorator";
import GET from "../decorators/get.decorator";
import SSR from "../decorators/ssr.decorator";
import USE from "../decorators/use.decorator";
import validate from "../validators/validate";
import { signUpValidation } from "../validators/user-schemas/sign-up.schema";
import { signInValidation } from "../validators/user-schemas/sign-in.schema";
import { isLogedIn } from "../middlewares/is-loged-in.middleware";
import { EditProfileDto } from "../dto/user/edit-profile.dto";
import PATCH from "../decorators/patch.decorator";
import { editProfileValidation } from "../validators/user-schemas/edit-profile.schema";

export class UserController extends BaseController {
    @SSR('/user/profile')
    @GET('/api/user/profile/:userId')
    async getUserProfileById({ query }: ControllerConfig<{}, GetUserProfileParams>) {
        const { userService } = this.di;
        const user = await userService.getUserProfileById(query.userId);
        if (!user) throw new HttpException('The user was not found', 404);
        return user; 
    }

    @USE([sessions, passportInitialize, passportAuthenticate])
    @USE(validate(signInValidation))
    @POST('/api/user/sign-in')
    async signIn({ user }: ControllerConfig) {
        return {
            isAuth: true,
            userId: user?.userId 
        };
    }

    @POST('/api/user/sign-up')
    @USE(validate(signUpValidation))
    async signUp({ body }: ControllerConfig<SignUpDto>) {
        const { userService } = this.di;
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

    @USE([sessions, passportInitialize, passportSession])
    @GET('/api/user/auth')
    async auth({ user }: ControllerConfig) {
        return {
            isAuth: user !== undefined,
            userId: user?.userId 
        };
    }

    @USE([sessions, passportInitialize, passportSession, isLogedIn])
    @GET('/api/user/log-out')
    async logout({ req }: ControllerConfig) {
        if (!req.logout) throw new HttpException('Unauthorized', 401);
        req.logout();
        return { message: 'Successful log out!' };
    }

    @USE([sessions, passportInitialize, passportSession, isLogedIn])
    @USE(validate(editProfileValidation))
    @PATCH('/api/user/edit-profile')
    async editProfile({ body, user }: ControllerConfig<EditProfileDto>) {
        const time = BigInt(new Date().getTime());
        await this.di.userService.editProfile(user?.userId!, {
            ...body,
            updatedAt: time
        });
        return { message: 'The user has been updated successfully!' };
    }
}