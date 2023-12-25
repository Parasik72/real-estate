export enum ToastifyStatus {
    Error = 'Error',
    Success = 'Success',
}

export interface ToastifyAction {
    id: string;
    status: ToastifyStatus;
    message: string;
}