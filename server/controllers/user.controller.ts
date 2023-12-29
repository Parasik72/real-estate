import { sessions } from "../sessions";
import { deserializeUser, passportAuthenticate, passportInitialize, passportSession } from "../passport";
import type { GetUserProfileParams } from "../params/user.params";
import type { SignUpDto } from "../dto/user/sign-up.dto";
import { HttpException } from "../exceptions/http.exception";
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
import type { EditProfileDto } from "../dto/user/edit-profile.dto";
import PATCH from "../decorators/patch.decorator";
import { editProfileValidation } from "../validators/user-schemas/edit-profile.schema";
import { validateRequest } from "../middlewares/validate-request.middleware";
import MESSAGE from "../decorators/message.decorator";
import CONTROLLER from "../decorators/controller.decorator";

@CONTROLLER()
export class UserController extends BaseController {
    @USE([sessions, deserializeUser])
    @SSR('/user/profile')
    @GET('/api/user/profile/:userId')
    async getUserProfileById({ query, user }: ControllerConfig<{}, GetUserProfileParams>) {
        const { UserService } = this.di;
        const userId = query.userId 
            ? query.userId 
            : user 
            ? user.userId 
            : '';
        const userProfile = await UserService.getUserProfileById(userId);
        if (!userProfile) throw new HttpException('The user was not found', 404);
        return userProfile; 
    }

    @USE([sessions, passportInitialize, passportAuthenticate, validateRequest])
    @USE(validate(signInValidation))
    @POST('/api/user/sign-in')
    @MESSAGE('Successfull sign in!')
    async signIn({ user }: ControllerConfig) {
        return {
            isAuth: true,
            userId: user?.userId 
        };
    }

    @POST('/api/user/sign-up')
    @USE(validate(signUpValidation))
    @MESSAGE('Successfull sign up!')
    async signUp({ body }: ControllerConfig<SignUpDto>) {
        const { UserService } = this.di;
        const emailInUse = await UserService.getUserByEmail(body.email);
        if (emailInUse) throw new HttpException('This email is already in use', 400);
        await UserService.createUser(body);
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
    @MESSAGE('Successfull log out!')
    async logout({ req }: ControllerConfig) {
        if (!req.logout) throw new HttpException('Unauthorized', 401);
        req.logout();
    }

    @USE([sessions, passportInitialize, passportSession, isLogedIn])
    @USE(validate(editProfileValidation))
    @PATCH('/api/user/edit-profile')
    @MESSAGE('The user has been updated successfully!')
    async editProfile({ body, user }: ControllerConfig<EditProfileDto>) {
        await this.di.UserService.editProfile(user?.userId!, body);
    }
}