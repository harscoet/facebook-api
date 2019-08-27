import { FacebookRequest } from '../lib/FacebookRequest';
export declare function getUserIdFromVanity(request: FacebookRequest): (vanity: string) => Promise<string>;
export declare namespace GetUserIdFromVanity {
    type Response = string;
}
export declare type GetUserIdFromVanity = (vanity: string) => Promise<GetUserIdFromVanity.Response>;
