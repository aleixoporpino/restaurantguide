export class HttpReturnMessage {
    errorCode: number; // 0 - OK, 1 - Validation error, 2 - Exception
    message?: string;
    object?: any;
}
