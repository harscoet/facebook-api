import { FacebookRequest } from '../lib/FacebookRequest';
import { ThreadListFolder } from '../types';
export declare function getThreadListInfoGraphQL(request: FacebookRequest): (options?: GetThreadListInfoGraphQL.Options) => Promise<GetThreadListInfoGraphQL.Response>;
export declare namespace GetThreadListInfoGraphQL {
    interface Options {
        limit?: number;
        before?: string | number;
        tags?: ThreadListFolder | ThreadListFolder[];
    }
    namespace Response {
        namespace Thread {
            interface Participant {
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
        interface Thread {
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
    interface Response {
        threads: Response.Thread[];
    }
}
export declare type GetThreadListInfoGraphQL = (options?: GetThreadListInfoGraphQL.Options) => Promise<GetThreadListInfoGraphQL.Response>;
