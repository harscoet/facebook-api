import { FacebookRequest } from '../lib/FacebookRequest';
import { Roger, Thread } from '../types';
/**
 * NO LONGER WORKING!
 */
export declare function getThreadListInfo(request: FacebookRequest): (options?: GetThreadListInfo.Options) => Promise<GetThreadListInfo.Response>;
export declare namespace GetThreadListInfo {
    interface Options {
        client?: Thread.ListClient;
        limit?: number;
        offset?: number;
        page?: number;
        allFolders?: boolean;
        folders?: Thread.ListFolder | Thread.ListFolder[];
    }
    interface Response {
        threads: Thread[];
        ordered_threadlists: Array<{
            start: number;
            end: number;
            thread_ids: string[];
            thread_fbids: string[];
            other_user_fbids: string[];
            folder: Thread.ListFolder;
            filter: string;
            error: string;
        }>;
        participants: Thread.Participant[];
        unseen_thread_fbids: Array<{
            thread_fbids: string[];
            other_user_fbids: string[];
            thread_ids: string[];
            folder: Thread.ListFolder;
        }>;
        roger: Roger;
        delivery_receipts: Array<{
            other_user_fbid: string;
            thread_fbid: string;
            time: number;
        }>;
        payload_source: string;
    }
}
export declare type GetThreadListInfo = (options?: GetThreadListInfo.Options) => Promise<GetThreadListInfo.Response>;
