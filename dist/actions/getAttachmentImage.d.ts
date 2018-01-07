import { FacebookRequest } from '../lib/FacebookRequest';
import { Image } from '../types';
export declare function getAttachmentImage(request: FacebookRequest): (threadId: string, imageId: string) => Promise<GetAttachmentImage.Response>;
export declare namespace GetAttachmentImage {
    interface Response {
        id: string;
        image1: Image;
        image2: Image;
        legacy_attachment_id: string;
        original_dimensions: {
            x: number;
            y: number;
        };
        photo_encodings: any[];
        __typename: string;
    }
}
export declare type GetAttachmentImage = (threadId: string, imageId: string) => Promise<GetAttachmentImage.Response>;
