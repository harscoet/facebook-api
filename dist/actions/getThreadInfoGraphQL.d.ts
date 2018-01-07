import { FacebookRequest } from '../lib/FacebookRequest';
import { ThreadListFolder } from '../types';
export declare function getThreadInfoGraphQL(request: FacebookRequest): (options?: GetThreadInfoGraphQL.Options) => Promise<GetThreadInfoGraphQL.Response>;
export declare namespace GetThreadInfoGraphQL {
    interface Options {
        limit?: number;
        before?: string | number;
        allFolders?: boolean;
        folders?: ThreadListFolder | ThreadListFolder[];
    }
    interface Response {
        messages: any;
    }
}
export declare type GetThreadInfoGraphQL = (options?: GetThreadInfoGraphQL.Options) => Promise<GetThreadInfoGraphQL.Response>;
