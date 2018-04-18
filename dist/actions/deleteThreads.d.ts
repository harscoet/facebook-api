import { FacebookRequest } from '../lib/FacebookRequest';
export declare function deleteThreads(request: FacebookRequest): (ids: string | string[]) => Promise<SendMessage.Response>;
export declare namespace SendMessage {
    interface Message {
        body: string;
        attachment?: any;
        url?: string;
        sticker?: any;
    }
    interface Response {
        status: string;
    }
}
export declare type SendMessage = (ids: string | string[]) => Promise<SendMessage.Response>;
