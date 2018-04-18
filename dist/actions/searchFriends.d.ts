import { FacebookRequest } from '../lib/FacebookRequest';
export declare function searchPeople(request: FacebookRequest): ({search, limit}?: SearchFriends.Options) => Promise<SearchFriends.Friend[]>;
export declare namespace SearchFriends {
    interface Options {
        search?: string;
        limit?: number;
    }
    namespace Response {
        interface Raw {
            extra_data: {
                __html: string;
            };
            pager: {
                __html: string;
            };
            results: {
                __html: string;
            };
        }
    }
    interface Friend {
        id: string;
        name: string;
    }
    type Response = Friend[];
}
export declare type SearchFriends = (options?: SearchFriends.Options) => Promise<SearchFriends.Response>;
