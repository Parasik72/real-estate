import { authUserService } from "@/common/services/auth-user/auth-user.service";
import { userService } from "@/common/services/user/user.service";


export default [
    authUserService.auth(),
    authUserService.logout(),
    authUserService.signIn(),
    authUserService.signUp(),
    userService.editProfile(),
    userService.getProfileByUserId(),
];