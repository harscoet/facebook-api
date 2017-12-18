import { FacebookRequest } from '../lib/FacebookRequest';

export function getThreadPicture(request: FacebookRequest) {
  return async (threadId: string, imageId: string): Promise<GetThreadPicture.Response> => {
    const result = await request.post<any>('ajax/messaging/attachments/sharedphotos.php', {
      worksWithGetMethod: true,
      withContext: true,
      parseResponse: true,
      payload: false,
      form: {
        thread_id: threadId,
        image_id: imageId,
      },
    });

    // Ugh...
    const queryThreadID = result.jsmods.require[0][3][1].query_metadata.query_path[0].message_thread;
    const imageData = result.jsmods.require[0][3][1].query_results[queryThreadID].message_images.edges[0].node.image2;

    return imageData;
  };
}

export namespace GetThreadPicture {
  export interface Response {
    height: number;
    uri: string;
    width: number;
  }
}

export type GetThreadPicture = (threadId: string, imageId: string) => Promise<GetThreadPicture.Response>;
