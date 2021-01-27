export interface Alert {
    title: string,
    text: string,
    type: string,
    confirmButtonText: string,
    showCancelButton?: boolean,
    cancelButtonText?: string,
    callBack?: any,
    context?: any,
    data?: any
}
