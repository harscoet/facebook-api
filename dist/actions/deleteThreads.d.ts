import { FacebookRequest } from '../lib/FacebookRequest';
export declare function deleteThreads(request: FacebookRequest): (ids: string | string[]) => Promise<DeleteThreads.Response>;
export declare namespace DeleteThreads {
    interface Response {
        status: string;
    }
}
export declare type DeleteThreads = (ids: string | string[]) => Promise<DeleteThreads.Response>;
