import { arrify, checkArrayParam, getOffset } from 'jsutil';
import { FacebookRequest } from '../lib/FacebookRequest';
import { Roger, Thread, ThreadListClient, ThreadListFolder, ThreadParticipant } from '../types';

const availableFolders: ThreadListFolder[] = ['INBOX', 'PENDING', 'ARCHIVED', 'OTHER'];
const availableClients: ThreadListClient[] = ['mercury', 'jewel', 'web_messenger'];

/**
 * NO LONGER WORKING!
 */
export function getThreadListInfo(request: FacebookRequest) {
  return async (options: GetThreadListInfo.Options = {}): Promise<GetThreadListInfo.Response> => {
    const {
      client = 'mercury',
      limit = 10,
      page,
      offset: rawOffset,
      folders = ['inbox'],
      allFolders,
    } = options;

    const selectedFolders = allFolders ? availableFolders : arrify(folders);
    const offset = getOffset(limit, page, rawOffset);
    const form = { client };

    checkArrayParam(client, availableClients, 'client');

    for (const folder of selectedFolders) {
      checkArrayParam(folder, availableFolders, 'folder');

      form[folder] = {
        limit,
        offset,
      };
    }

    const result = await request.post<GetThreadListInfo.Response>('ajax/mercury/threadlist_info.php', {
      worksWithGetMethod: true,
      withContext: true,
      parseResponse: true,
      payload: true,
      form,
    });

    if (!result) {
      return {
        threads: [],
        ordered_threadlists: [],
        participants: [],
        unseen_thread_fbids: [],
        roger: {},
        delivery_receipts: [],
        payload_source: '',
      };
    }

    if (!result.threads) {
      result.threads = [];
    }

    return result;
  };
}

export namespace GetThreadListInfo {
  export interface Options {
    client?: ThreadListClient;
    limit?: number;
    offset?: number;
    page?: number;
    allFolders?: boolean;
    folders?: ThreadListFolder|ThreadListFolder[];
  }

  export interface Response {
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
      thread_fbids: string[],
      other_user_fbids: string[],
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

export type GetThreadListInfo = (options?: GetThreadListInfo.Options) => Promise<GetThreadListInfo.Response>;
