import { FacebookRequest } from '../lib/FacebookRequest';
import { Gender, User } from '../types';
export declare function getFriendsList(request: FacebookRequest): ({gender}?: GetFriendsList.Options) => Promise<GetFriendsList.Response>;
export declare namespace GetFriendsList {
    interface Options {
        gender?: Gender | 'male' | 'female' | 'm' | 'f';
    }
    interface Response {
        [key: string]: User;
    }
}
export declare type GetFriendsList = (options?: GetFriendsList.Options) => Promise<GetFriendsList.Response>;
