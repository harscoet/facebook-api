import { FacebookRequest } from '../lib/FacebookRequest';
export declare function addFriend(request: FacebookRequest): (id: string) => Promise<AddFriend.Response>;
export declare namespace AddFriend {
    interface Response {
        success: boolean;
    }
}
export declare type AddFriend = (id: string) => Promise<AddFriend.Response>;
