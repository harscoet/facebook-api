import { getOffset } from 'jsutil';
import { FacebookRequest } from '../lib/FacebookRequest';

export function getThreadPictures(request: FacebookRequest) {
  return async (threadId: string, options: GetThreadPictures.Options = {}): Promise<GetThreadPictures.Response> => {
    const { limit = 10, offset: rawOffset, page } = options;
    const offset = getOffset(limit, page, rawOffset);

    const result = await request.post<GetThreadPictures.Response>('ajax/messaging/attachments/sharedphotos.php', {
      worksWithGetMethod: true,
      withContext: true,
      parseResponse: true,
      payload: true,
      form: {
        thread_id: threadId,
        offset,
        limit,
      },
    });

    if (!result || !result.imagesData) {
      return {
        imagesData: [],
        moreImagesToLoad: false,
      };
    }

    return result;
  };
}

export namespace GetThreadPictures {
  export interface Options {
    limit?: number;
    offset?: number;
    page?: number;
  }

  export interface Image {
    dim: string;
    fbid: string;
    media_type: string;
    src_uri: string;
    uri: string;
  }

  export interface Response {
    imagesData: Image[];
    moreImagesToLoad: boolean;
  }
}

export type GetThreadPictures = (threadId: string, options?: GetThreadPictures.Options) => Promise<GetThreadPictures.Response>;
