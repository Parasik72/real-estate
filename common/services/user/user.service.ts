import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { SignInDto } from "./dto/sign-in.dto";
import { PropertyAddressModel } from "../property/property-address.model";
import { PropertyModel } from "../property/property.model";
import { UserModel } from "./user.model";

class UserService extends HttpService {
    async signIn(dto: SignInDto) {
        const data = await this.post<SignInDto, { message: string }>({
            body: dto,
            url: BACK_PATHS.signIn
        });
        if (!data) return null;
        console.log(data.message)
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
}

export const userService = new UserService;