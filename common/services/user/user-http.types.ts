export interface GetUserResponse {
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    createdAt: BigInt,
    updatedAt: BigInt
}