import { Gender } from './Gender';
export declare namespace Thread {
    type ListClient = 'mercury' | 'jewel' | 'web_messenger';
    type ListFolder = 'INBOX' | 'PENDING' | 'ARCHIVED' | 'OTHER' | 'UNREAD';
    interface Participant {
        id: string;
        fbid: string;
        gender: Gender;
        href: string;
        image_src: string;
        big_image_src: string;
        name: string;
        short_name: string;
        employee: boolean;
        is_employee_away: boolean;
        is_user_focusing: boolean;
        type: string;
        vanity: string;
        accepts_messenger_user_feedback: boolean;
        is_friend: boolean;
        is_messenger_user: boolean;
        is_business_enabled: boolean;
        is_verified: boolean;
        is_messenger_platform_bot: boolean;
        timezone: string;
        work_id: string;
        personal_id: string;
        is_messenger_blocked: boolean;
    }
    interface SnippetAttachment {
        app_attribution: string;
        attach_type: string;
        name: string;
        url: string;
        url_shimhash: string;
        url_skipshim: boolean;
        rel: string;
        preview_url: string;
        preview_width: string;
        preview_height: number;
        large_preview_url: string;
        large_preview_width: number;
        large_preview_height: number;
        icon_type: string;
        metadata: {
            fbid: string;
            dimensions: string;
        };
        thumbnail_url: string;
    }
}
export interface Thread {
    thread_id: string;
    thread_fbid: string;
    other_user_fbid: string;
    participants: string[];
    name: string;
    snippet: string;
    snippet_attachments: Thread.SnippetAttachment[];
    snippet_sender: string;
    unread_count: number;
    message_count: number;
    image_src: string;
    timestamp: number;
    server_timestamp: number;
    mute_until: string;
    mentions_mute_mode: number;
    is_canonical_user: boolean;
    is_canonical: boolean;
    is_pin_protected: boolean;
    is_subscribed: boolean;
    is_thread_queue_enabled: boolean;
    mayorship_mode: number;
    folder: Thread.ListFolder;
    is_archived: boolean;
    recipients_loadable: boolean;
    has_email_participant: boolean;
    read_only: boolean;
    can_reply: boolean;
    cannot_reply_reason: string;
    last_message_timestamp: number;
    last_read_timestamp: number;
    last_message_type: string;
    ephemeral_ttl_mode: number;
    custom_like_icon: string;
    custom_nickname: string;
    custom_color: string;
    admin_ids: string[];
    customization_enabled: boolean;
    approval_mode: number;
    joinable_mode: {
        link: string;
        mode: number;
    };
    participant_add_mode: string;
    approval_queue_ids: string[];
    lightweight_event: string;
    timezone_warning_dismiss_count: object;
    work_user_warning_dismiss_count: object;
    thread_type: number;
    rtc_call_data: {
        call_state: string;
        server_info_data: string;
        initiator_fbid: number;
    };
    reactions_mute_mode: number;
    associated_object: string;
    has_montage: boolean;
}
