import { User } from "@/db/models/user";

export class UserService {
    async getUserByEmail(email: string) {
        return User.findOne({ where: { email } });
    }
}