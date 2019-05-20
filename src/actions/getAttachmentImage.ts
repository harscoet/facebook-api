import { FacebookRequest } from '../lib/FacebookRequest';
import { Image } from '../types';

export function getAttachmentImage(request: FacebookRequest) {
  return async (
    threadId: string,
    imageId: string,
  ): Promise<GetAttachmentImage.Response> => {
    const queryId = '535955503408405';

    const result = await request.post<string>('webgraphql/query/', {
      parseResponse: true,
      payload: true,
      withContext: true,
      qs: {
        query_id: queryId,
        variables: JSON.stringify({
          id: threadId,
          photoID: imageId,
        }),
        dpr: 1,
      },
    });

    return result[threadId].message_shared_media.edges[0].node;
  };
}

export namespace GetAttachmentImage {
  export interface Response {
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

export type GetAttachmentImage = (
  threadId: string,
  imageId: string,
) => Promise<GetAttachmentImage.Response>;
