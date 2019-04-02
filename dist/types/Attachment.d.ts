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
