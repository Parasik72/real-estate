export class HttpException {
    constructor(
        public readonly message: string,
        public readonly statusCode: number
    ) {}
}