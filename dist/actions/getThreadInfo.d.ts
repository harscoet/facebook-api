import { FacebookRequest } from '../lib/FacebookRequest';
import { Attachment, Roger, ThreadListClient, ThreadListFolder } from '../types';
export declare function getThreadInfo(request: FacebookRequest): (options?: GetThreadInfo.Options) => Promise<GetThreadInfo.Response>;
export declare namespace GetThreadInfo {
    interface Options {
        client?: ThreadListClient;
        threadIds?: string | string[];
        threadFbids?: string | string[];
        userIds?: string | string[];
        limit?: number;
        offset?: number;
        page?: number;
        timestamp?: number;
    }
    interface Response {
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
            customizations: string[];
            source: string;
            source_tags: string[];
            tags: string[];
            is_spoof_warning: boolean;
            folder: ThreadListFolder;
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
                untypedData: object;
                message_type: string;
            };
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
export declare type GetThreadInfo = (options?: GetThreadInfo.Options) => Promise<GetThreadInfo.Response>;
