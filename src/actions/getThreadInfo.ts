import { arrify, getOffset } from 'jsutil';
import { FacebookRequest } from '../lib/FacebookRequest';
import { Attachment, Roger, Thread } from '../types';

function addPagination(target: {}, key: string, arr: string|string[], limit: number, offset: number, timestamp?: number) {
  for (const id of arrify(arr)) {
    if (!target[key]) {
      target[key] = {};
    }

    target[key][id] = {
      limit,
      offset,
      timestamp,
    };
  }
}

export function getThreadInfo(request: FacebookRequest) {
  return async (options: GetThreadInfo.Options = {}): Promise<GetThreadInfo.Response> => {
    const {
      client,
      limit = 10,
      offset: rawOffset,
      page,
      threadFbids,
      threadIds,
      userIds,
      timestamp,
    } = options;

    const offset = getOffset(limit, page, rawOffset);

    if (offset && !timestamp) {
      throw new Error('timestamp option is required when offset > 0');
    }

    const form: {
      client: Thread.ListClient;
      messages: {}
    } = {
      client,
      messages: {},
    };

    addPagination(form.messages, 'thread_ids', threadIds, limit, offset, timestamp);
    addPagination(form.messages, 'thread_fbids', threadFbids, limit, offset, timestamp);
    addPagination(form.messages, 'user_ids', userIds, limit, offset, timestamp);

    return request.post<GetThreadInfo.Response>('ajax/mercury/thread_info.php', {
      worksWithGetMethod: true,
      withContext: true,
      parseResponse: true,
      payload: true,
      form,
    });
  };
}

export namespace GetThreadInfo {
  export interface Options {
    client?: Thread.ListClient;
    threadIds?: string|string[];
    threadFbids?: string|string[];
    userIds?: string|string[];
    limit?: number;
    offset?: number;
    page?: number;
    timestamp?: number;
  }

  export interface Response {
    actions: Array<{
      message_id: string;
      threading_id: string;
      offline_threading_id: string;
      author: string;
      author_email: string;
      ephemeral_ttl_mode: number;
      timestamp: number;
      is_unread: boolean;
      is_filtered_content: boolean;
      is_filtered_content_bh: boolean;
      is_filtered_content_account: boolean;
      is_filtered_content_quasar: boolean;
      is_filtered_content_invalid_app: boolean;
      is_sponsored: boolean;
      commerce_message_type: string;
      customizations: string[],
      source: string;
      source_tags: string[];
      tags: string[];
      is_spoof_warning: boolean;
      folder: Thread.ListFolder;
      thread_fbid: string;
      other_user_fbid: string;
      platform_xmd: null;
      message_source: string;
      montage_reply_data: string;
      skip_bump_thread: boolean;
      profile_ranges: string[];
      reactions: object;
      body: string;
      subject: string;
      has_attachment: boolean;
      attachments: Attachment[];
      raw_attachments: any;
      meta_ranges: string[];
      log_message_type: string;
      log_message_data: {
        untypedData: object,
        message_type: string;
      },
      log_message_body: string;
      thread_id: string;
      action_type: string;
    }>;
    end_of_history: Array<{
      type: string;
      fbid: string;
    }>;
    roger: Roger;
    payload_source: string;
    sequence_id: number;
  }
}

export type GetThreadInfo = (options?: GetThreadInfo.Options) => Promise<GetThreadInfo.Response>;
