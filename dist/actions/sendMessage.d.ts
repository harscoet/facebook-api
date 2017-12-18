import { FacebookRequest } from '../lib/FacebookRequest';
export declare function sendMessage(request: FacebookRequest): (id: string, message?: string | SendMessage.Message) => Promise<SendMessage.Response>;
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
export declare type SendMessage = (id: string, message: string | SendMessage.Message) => Promise<SendMessage.Response>;
