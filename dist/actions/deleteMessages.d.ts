import { FacebookRequest } from '../lib/FacebookRequest';
export declare function deleteMessages(request: FacebookRequest): (ids: string | string[]) => Promise<DeleteMessages.Response>;
export declare namespace DeleteMessages {
    interface Response {
        status: string;
    }
}
export declare type DeleteMessages = (ids: string | string[]) => Promise<DeleteMessages.Response>;
