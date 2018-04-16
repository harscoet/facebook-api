import { FacebookRequest } from '../lib/FacebookRequest';
export declare function getFriendPhotos(request: FacebookRequest): ({id}: GetFriendPhotos.Options) => Promise<GetFriendPhotos.Response>;
export declare namespace GetFriendPhotos {
    interface Options {
        id: string;
    }
    interface Context {
        collection_token: string;
        lst: string;
        pagelet_token: string;
    }
    interface Response {
        context: Context;
        photos: string[];
    }
}
export declare type GetFriendPhotos = (options?: GetFriendPhotos.Options) => Promise<GetFriendPhotos.Response>;
