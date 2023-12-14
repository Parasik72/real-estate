import { BACK_PATHS } from "@/common/constants/back-paths.constants";
import { HttpService } from "../http.service";
import { SignInDto } from "./dto/sign-in.dto";
import { PropertyAddressModel } from "../property/property-address.model";
import { PropertyModel } from "../property/property.model";
import { UserModel } from "./user.model";
import { AuthUser } from "@/common/store/user/user.state.interface";
import { SignUpDto } from "./dto/sign-up.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";

class UserService extends HttpService {
    async signIn(dto: SignInDto) {
        return this.post<SignInDto, AuthUser>({
            body: dto,
            url: BACK_PATHS.signIn
        });
    }

    async signUp(dto: SignUpDto) {
        return this.post<SignUpDto, { message: string }>({
            body: dto,
            url: BACK_PATHS.signUp
        });
    }

    async getProfileByUserId(userId: string)
    : Promise<UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] } | null> {
        return this.get<UserModel & { Properties: (PropertyModel & {PropertyAddress: PropertyAddressModel})[] }>({
            url: BACK_PATHS.getProfileByUserId
                .replace(':userId', userId)
        });
    }

    async auth() {
        return this.get<AuthUser>({ url: BACK_PATHS.auth });
    }

    async logout() {
        return this.get<{ message: string }>({ url: BACK_PATHS.logout });
    }

    async editProfile(dto: EditProfileDto): Promise<{ message: string } | null> {
        return this.patch<EditProfileDto, { message: string }>({
            url: BACK_PATHS.editProfile,
            body: dto
        });
    }
}

export const userService = new UserService;