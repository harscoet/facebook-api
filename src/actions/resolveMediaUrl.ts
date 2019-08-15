import { FacebookRequest } from '../lib/FacebookRequest';

export function resolveMediaUrl(request: FacebookRequest) {
  return async (mediaId: string): Promise<string> => {
    const result = await request.post<any>('mercury/attachments/photo', {
      worksWithGetMethod: true,
      withContext: true,
      parseResponse: true,
      payload: false,
      data: {
        photo_id: mediaId,
      },
    });

    return result.jsmods.require[0][3][0];
  };
}

export type ResolveMediaUrl = (mediaId: string) => Promise<string>;
