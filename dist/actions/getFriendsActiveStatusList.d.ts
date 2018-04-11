import { FacebookRequest } from '../lib/FacebookRequest';
export declare function getFriendsActiveStatusList(request: FacebookRequest): ({filterId}?: GetFriendsActiveStatusList.Options) => Promise<GetFriendsActiveStatusList.Response>;
export declare namespace GetFriendsActiveStatusList {
    interface Options {
        filterId?: string;
    }
    interface Response {
        [key: string]: number;
    }
}
export declare type GetFriendsActiveStatusList = (options?: GetFriendsActiveStatusList.Options) => Promise<GetFriendsActiveStatusList.Response>;
