import { FacebookRequest } from '../lib/FacebookRequest';
import { User } from '../types';
export declare function getUserInfo(request: FacebookRequest): (ids: string | string[]) => Promise<GetUserInfo.Response>;
export declare namespace GetUserInfo {
    interface Response {
        profiles: {
            [key: string]: User;
        };
    }
}
export declare type GetUserInfo = (ids: string | string[]) => Promise<GetUserInfo.Response>;
