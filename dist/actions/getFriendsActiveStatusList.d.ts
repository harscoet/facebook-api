import { FacebookRequest } from '../lib/FacebookRequest';
export declare function getFriendsActiveStatusList(request: FacebookRequest): ({ filterId, legacy }?: GetFriendsActiveStatusList.Options) => Promise<GetFriendsActiveStatusList.Response>;
export declare namespace GetFriendsActiveStatusList {
    interface Options {
        filterId?: string;
        legacy?: boolean;
    }
    interface Status {
        lat?: number;
        is_active?: boolean;
    }
    interface Response {
        [key: string]: Status;
    }
}
export declare type GetFriendsActiveStatusList = (options?: GetFriendsActiveStatusList.Options) => Promise<GetFriendsActiveStatusList.Response>;
