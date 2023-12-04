import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { SignInDto } from "./dto/sign-in.dto";

class UserService extends HttpService {
    async signIn(dto: SignInDto) {
        const data = await this.post<SignInDto, { message: string }>({
            body: dto,
            url: BACK_PATHS.signIn
        });
        if (!data) return null;
        console.log(data.message)
    }
}

export const userService = new UserService;