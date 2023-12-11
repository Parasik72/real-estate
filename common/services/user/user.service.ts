import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { SignInDto } from "./dto/sign-in.dto";
import { PropertyAddressModel } from "../property/property-address.model";
import { PropertyModel } from "../property/property.model";
import { UserModel } from "./user.model";
import { AuthUser } from "@/common/store/user/user.state.interface";
import { SignUpDto } from "./dto/sign-up.dto";

class UserService extends HttpService {
    async signIn(dto: SignInDto) {
        const data = await this.post<SignInDto, AuthUser>({
            body: dto,
            url: BACK_PATHS.signIn
        });
        if (!data) return null;
        return data;
    }

    async signUp(dto: SignUpDto) {
        const data = await this.post<SignUpDto, { message: string }>({
            body: dto,
            url: BACK_PATHS.signUp
        });
        if (!data) return null;
        return data;
    }

    async getProfileByUserId(userId: string)
    : Promise<UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] } | null> {
        const data = await this.get<UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] }>({
            url: BACK_PATHS.getProfileByUserId
                .replace(':userId', userId)
        });
        if (!data) return null;
        return data;
    }

    async auth() {
        return this.get<AuthUser>({ url: BACK_PATHS.auth });
    }

    async logout() {
        return this.get<{ message: string }>({ url: BACK_PATHS.logout });
    }
}

export const userService = new UserService;