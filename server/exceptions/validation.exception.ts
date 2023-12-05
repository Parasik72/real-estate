export class ValidationException {
    constructor(
        public readonly message: string,
        public readonly statusCode: number
    ) {}
}