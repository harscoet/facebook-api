import { FacebookRequest } from '../lib/FacebookRequest';
import { Roger, Thread, ThreadListClient, ThreadListFolder, ThreadParticipant } from '../types';
/**
 * NO LONGER WORKING!
 */
export declare function getThreadListInfo(request: FacebookRequest): (options?: GetThreadListInfo.Options) => Promise<GetThreadListInfo.Response>;
export declare namespace GetThreadListInfo {
    interface Options {
        client?: ThreadListClient;
        limit?: number;
        offset?: number;
        page?: number;
        allFolders?: boolean;
        folders?: ThreadListFolder | ThreadListFolder[];
    }
    interface Response {
        threads: Thread[];
        ordered_threadlists: Array<{
            start: number;
            end: number;
            thread_ids: string[];
            thread_fbids: string[];
            other_user_fbids: string[];
            folder: ThreadListFolder;
            filter: string;
            error: string;
        }>;
        participants: ThreadParticipant[];
        unseen_thread_fbids: Array<{
            thread_fbids: string[];
            other_user_fbids: string[];
            thread_ids: string[];
            folder: ThreadListFolder;
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
