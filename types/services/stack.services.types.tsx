export interface IRequestObject{
    method: string,
    url:string,
    headers: {
        'authorization': string | null | undefined,
        "Content-Type": string,
        'Accept'?: string,
    },
    params?: string,
    data?: any,

}



