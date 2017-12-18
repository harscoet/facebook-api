import { FacebookRequest } from '../lib/FacebookRequest';
export declare function getThreadPicture(request: FacebookRequest): (threadId: string, imageId: string) => Promise<GetThreadPicture.Response>;
export declare namespace GetThreadPicture {
    interface Response {
        height: number;
        uri: string;
        width: number;
    }
}
export declare type GetThreadPicture = (threadId: string, imageId: string) => Promise<GetThreadPicture.Response>;
