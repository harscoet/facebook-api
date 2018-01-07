import { FacebookRequest } from '../lib/FacebookRequest';
import { Image } from '../types';
export declare function getThreadHistoryGraphQL(request: FacebookRequest): (options?: GetThreadHistoryGraphQL.Options) => Promise<GetThreadHistoryGraphQL.Response>;
export declare namespace GetThreadHistoryGraphQL {
    interface Options {
        threadId?: string;
        limit?: number;
        before?: string | number;
    }
    namespace Response {
        namespace Message {
            interface ExtensibleAttachment {
                legacy_attachment_id: string;
                story_attachment: {
                    action_links: any[];
                    deduplication_key: string;
                    description: {
                        text: string;
                    };
                    media: {
                        animated_image: any;
                        image: Image;
                        is_playable: boolean;
                        playable_duration_in_ms: number;
                        playable_url: string;
                        messaging_attribution: any;
                        messenger_call_to_actions: any[];
                        properties: Array<{
                            key: string;
                            value: {
                                text: number;
                            };
                        }>;
                        source: {
                            text: string;
                        };
                        style_list: string[];
                        subattachments: Message.ExtensibleAttachment[];
                        target: {
                            __typename: string;
                        };
                        title_with_entities: {
                            text: string;
                        };
                        url: string;
                    };
                };
            }
            interface BlobAttachment {
                attribution_app: any;
                attribution_metadata: any;
                filename: string;
                chat_image: Image;
                inbox_image: Image;
                large_preview: Image;
                large_image: Image;
                legacy_attachment_id: string;
                original_dimensions: {
                    x: number;
                    y: number;
                };
                playable_duration_in_ms: number;
                playable_url: string;
                video_type: string;
                original_extension: string;
                photo_encodings: any[];
                preview: Image;
                render_as_sticker: boolean;
                thumbnail: {
                    uri: string;
                };
                __typename: string;
            }
        }
        interface Message {
            ad_client_token: string;
            ad_id: string;
            blob_attachments: Message.BlobAttachment[];
            commerce_message_type: string;
            customizations: any[];
            extensible_attachment: Message.ExtensibleAttachment;
            is_sponsored: boolean;
            message: {
                ranges: any[];
                text: string;
            };
            message_id: string;
            message_reactions: any[];
            message_sender: {
                email: string;
                id: string;
            };
            message_source_data: any;
            meta_ranges: any[];
            montage_reply_data: any;
            offline_threading_id: string;
            page_admin_sender: any;
            platform_xmd_encoded: any;
            sticker: any;
            tags_list: string[];
            timestamp_precise: string;
            ttl: number;
            unread: boolean;
            __typename: string;
        }
    }
    interface Response {
        all_participants: {
            nodes: Array<{
                messaging_actor: {
                    id: string;
                    __typename: string;
                };
            }>;
        };
        approval_mode: any;
        associated_object: any;
        cannot_reply_reason: any;
        customization_enabled: boolean;
        customization_info: any;
        ephemeral_ttl_mode: number;
        event_reminders: {
            nodes: any[];
        };
        folder: string;
        has_viewer_archived: boolean;
        image: string;
        is_canonical_neo_user: boolean;
        is_pin_protected: boolean;
        is_viewer_subscribed: boolean;
        joinable_mode: {
            link: string;
            mode: string;
        };
        last_message: {
            nodes: Array<{
                blob_attachments: any[];
                commerce_message_type: string;
                extensible_attachment: any;
                message_sender: {
                    messaging_actor: {
                        id: string;
                        __typename: string;
                    };
                };
                snippet: string;
                sticker: any;
                timestamp_precise: string;
            }>;
        };
        last_read_receipt: {
            nodes: Array<{
                timestamp_precise: string;
            }>;
        };
        mentions_mute_mode: string;
        messages: {
            nodes: Response.Message[];
            page_info: {
                has_previous_page: boolean;
            };
        };
        messages_count: number;
        montage_thread: any;
        mute_until: any;
        name: any;
        page_comm_item: any;
        participant_add_mode_as_string: any;
        participants_event_status: any[];
        privacy_mode: number;
        reactions_mute_mode: string;
        related_page_thread: any;
        rtc_call_data: {
            call_state: string;
            initiator: any;
            server_info_data: string;
        };
        thread_admins: any[];
        thread_key: {
            other_user_id: string;
            thread_fbid: string;
        };
        thread_queue_enabled: boolean;
        thread_queue_metadata: any;
        thread_streak_data: {
            days_in_streak: number;
            streak_begin_timestamp: number;
            streak_reciprocation_timestamp: number;
        };
        thread_type: string;
        unread_count: number;
        updated_time_precise: string;
    }
}
export declare type GetThreadHistoryGraphQL = (options?: GetThreadHistoryGraphQL.Options) => Promise<GetThreadHistoryGraphQL.Response>;
