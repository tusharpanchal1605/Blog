import { Response } from 'express';

export class Message {
    message:string | undefined;
    status:boolean | undefined;
    data: Object | undefined;
    error:string | undefined;

    constructor(message:string,status:boolean,data?:Object,error?:string) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.error = error;
    }

   
}