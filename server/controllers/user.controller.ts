import { NextApiResponse } from "next";
import { INextApiRequestExtended } from "../types/http.types";
import container from "../container";
import { GetUserProfileParams } from "../params/user.params";
import { UserService } from "../services/user.service";
import { SignUpDto } from "../dto/user/sign-up.dto";
import { HttpException } from "../exceptions/http.exception";
import bcryptjs from 'bcryptjs';
import { v4 } from "uuid";
import { UUID } from "crypto";

export class UserController {
    async getUserProfileByIdServerSideProps(params: GetUserProfileParams) {
        const userService = container.resolve<UserService>('userService');
        const user = await userService.getUserProfileById(params.userId);
        if (!user) return { notFound: true };
        const data = JSON.parse(JSON.stringify({ 
            user, 
            userProperties: user.Properties
        }));
        return { props: data }; 
    }

    async signIn(req: INextApiRequestExtended, res: NextApiResponse) {
        res.status(200).json({ message: 'Successful sign in!' })
    }

    async signUp(req: INextApiRequestExtended<SignUpDto>, res: NextApiResponse) {
        try {
            const userService = container.resolve<UserService>('userService');
            const emailInUse = await userService.getUserByEmail(req.body.email);
            if (emailInUse) throw new HttpException('This email is already in use', 400);
            const userId = v4() as UUID;
            const hashPassword = bcryptjs.hashSync(req.body.password, 5);
            const time = BigInt(new Date().getTime());
            await userService.createUser({
                ...req.body,
                userId,
                password: hashPassword,
                createdAt: time,
                updatedAt: time
            });
            return res.status(201).json({ message: 'Successful sign up!' })
        } catch (error) {
          if (error instanceof HttpException) {
            return res.status(error.statusCode).json({ error: error.message });
          }
          return res.status(500).json({ error: `Error of signing up: ${error}` });
        }
    }
}