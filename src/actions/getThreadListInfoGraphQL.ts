import { arrify } from 'jsutil';
import { FacebookRequest } from '../lib/FacebookRequest';
import { ThreadListFolder } from '../types';

export function getThreadListInfoGraphQL(request: FacebookRequest) {
  return async (options: GetThreadListInfoGraphQL.Options = {}): Promise<GetThreadListInfoGraphQL.Response> => {
    /**
     * before is used for pagination, it is first message timestamp from previous page
     * ex: result.messages.nodes[0].timestamp_precise
     */
    const { before, limit = 20, tags } = options;

    const form = {
      batch_name: 'MessengerGraphQLThreadlistFetcherRe',
      queries: JSON.stringify({
        o0: {
          doc_id: '1349387578499440', // This doc_id was valid on November 20th 2017.
          query_params: {
            limit: limit + (before ? 1 : 0),
            before: before ? parseInt(String(before), 10) : null,
            tags: arrify(tags),
            includeDeliveryReceipts: true,
            includeSeqID: false,
          },
        },
      }),
    };

    const result = await request.post<string>('api/graphqlbatch', {
      graphql: true,
      withContext: true,
      form,
    });

    const threads: { nodes: GetThreadListInfoGraphQL.Response.Thread[] } = (result[0] as any).o0.data.viewer.message_threads;

    // With before option, facebook returns dupplicate message
    if (before && threads && threads.nodes.length) {
      threads.nodes.shift();
    }

    return {
      threads: threads.nodes.map(t => ({
        ...t,
        thread_id: t.thread_key.thread_fbid || t.thread_key.other_user_id,
      })),
    };
  };
}

export namespace GetThreadListInfoGraphQL {
  export interface Options {
    limit?: number;
    before?: string|number;
    tags?: ThreadListFolder|ThreadListFolder[];
  }

  export namespace Response {
    export namespace Thread {
      export interface Participant {
        big_image_src: {
          uri: string;
        };
        gender: string;
        id: string;
        is_employee: boolean;
        is_message_blocked_by_viewer: boolean;
        is_messenger_user: boolean;
        is_verified: boolean;
        is_viewer_coworker: boolean;
        is_viewer_friend: boolean;
        name: string;
        short_name: string;
        url: string;
        username: string;
        __typename: string;
      }
    }

    export interface Thread {
      thread_id: string;
      all_participants: {
        nodes: Array<{
          messaging_actor: Thread.Participant;
        }>;
      };
      last_message: {
        nodes: Array<{
          blob_attachments: any[];
          commerce_message_type: any;
          extensible_attachment: any;
          message_sender: {
            messaging_actor: {
              id: string;
            };
          };
          snippet: string;
          sticker: any;
          timestamp_precise: string;
        }>;
      };
      folder: string;
      has_viewer_archived: boolean;
      messages_count: number;
      mute_until: string;
      reactions_mute_mode: string;
      updated_time_precise: string;
      thread_type: string;
      thread_key: {
        other_user_id: string;
        thread_fbid: string;
      };
    }
  }

  export interface Response {
    threads: Response.Thread[];
  }
}

export type GetThreadListInfoGraphQL = (options?: GetThreadListInfoGraphQL.Options) => Promise<GetThreadListInfoGraphQL.Response>;
