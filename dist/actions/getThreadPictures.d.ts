import { FacebookRequest } from '../lib/FacebookRequest';
export declare function getThreadPictures(request: FacebookRequest): (threadId: string, options?: GetThreadPictures.Options) => Promise<GetThreadPictures.Response>;
export declare namespace GetThreadPictures {
    interface Options {
        limit?: number;
        offset?: number;
        page?: number;
    }
    interface Image {
        dim: string;
        fbid: string;
        media_type: string;
        src_uri: string;
        uri: string;
    }
    interface Response {
        imagesData: Image[];
        moreImagesToLoad: boolean;
    }
}
export declare type GetThreadPictures = (threadId: string, options?: GetThreadPictures.Options) => Promise<GetThreadPictures.Response>;
