import { NextApiResponse } from "next";
import { INextApiRequestExtended } from "../types/http.types";

export class UserController {
    async signIn(req: INextApiRequestExtended, res: NextApiResponse) {
        res.status(200).json({ message: 'Successful sign in!' })
    }
}