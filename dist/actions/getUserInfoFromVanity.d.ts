import { FacebookRequest } from '../lib/FacebookRequest';
export declare function getUserInfoFromVanity(request: FacebookRequest): (vanity: string) => Promise<GetUserInfoFromVanity.Response>;
export declare namespace GetUserInfoFromVanity {
    interface Response {
        id: string;
        name: string;
    }
}
export declare type GetUserInfoFromVanity = (vanity: string) => Promise<GetUserInfoFromVanity.Response>;
