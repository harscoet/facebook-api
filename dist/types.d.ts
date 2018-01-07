/**
 * List of reusable types
 */
export declare type ThreadListFolder = 'INBOX' | 'PENDING' | 'ARCHIVED' | 'OTHER' | 'UNREAD';
export declare type ThreadListClient = 'mercury' | 'jewel' | 'web_messenger';
export interface Roger {
    [key: string]: {
        [key: string]: {
            watermark: number;
            action: number;
        } | any[];
    };
}
export declare enum Gender {
    unknown = 0,
    female_singular = 1,
    male_singular = 2,
    female_singular_guess = 3,
    male_singular_guess = 4,
    mixed = 5,
    neuter_singular = 6,
    unknown_singular = 7,
    female_plural = 8,
    male_plural = 9,
    neuter_plural = 10,
    unknown_plural = 11,
}
export interface User {
    id: string;
    name: string;
    firstName: string;
    vanity: string;
    thumbSrc: string;
    uri: string;
    alternateName: string;
    dir: string;
    gender: Gender;
    i18nGender: number;
    is_friend: boolean;
    is_nonfriend_messenger_contact: boolean;
    mThumbSrcLarge: string;
    mThumbSrcSmall: string;
    searchTokens: string[];
    type: string;
}
export interface Attachment {
    app_attribution: 'error' | 'share' | 'photo' | 'sticker' | 'animated_image' | 'video';
    attach_type: string;
    name: string;
    url: string;
    url_shimhash: string;
    url_skipshim: string;
    rel: string;
    preview_url: string;
    preview_width: number;
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
    share: {
        description: string;
        media: {
            animated_image: string;
            animated_image_size: {
                height: number;
                width: number;
            };
            image: string;
            image_size: {
                height: number;
                width: number;
            };
            duration: number;
            playable: boolean;
            source: string;
        };
        source: string;
        style_list: string[];
        target: string;
        title: string;
        properties: {
            width: number;
            height: number;
        };
        uri: string;
        subattachments: Attachment[];
        deduplication_key: string;
        action_links: Array<{
            title: string;
            uri: string;
        }>;
        messaging_attribution: {
            attribution_type: string;
            attribution_id: string;
            name: string;
            icon_url: string;
        };
        messenger_ctas: string[];
        share_id: string;
    };
}
export interface Thread {
    thread_id: string;
    thread_fbid: string;
    other_user_fbid: string;
    participants: string[];
    name: string;
    snippet: string;
    snippet_attachments: Array<{
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
    }>;
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
    folder: ThreadListFolder;
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
export interface ThreadParticipant {
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
export interface Image {
    height: number;
    width: number;
    uri: string;
}
