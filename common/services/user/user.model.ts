export class UserModel {
    constructor(
        public userId: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public password: string,
        public createdAt: BigInt,
        public updatedAt: BigInt
    ) {}
}

export const createUserModel = 
    <T extends UserModel>(item: T) => new UserModel(
        item.userId,
        item.firstName,
        item.lastName,
        item.email,
        item.phone,
        item.password,
        item.createdAt,
        item.updatedAt
    );
