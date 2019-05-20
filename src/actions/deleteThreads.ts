import { FacebookRequest } from '../lib/FacebookRequest';
import { arrify } from 'jsutil';

export function deleteThreads(request: FacebookRequest) {
  return async (ids: string | string[]): Promise<DeleteThreads.Response> => {
    await request.init();

    return request.post<DeleteThreads.Response>(
      'ajax/mercury/delete_thread.phpd',
      {
        withContext: true,
        parseResponse: true,
        payload: true,
        qs: {
          dpr: 2,
        },
        form: {
          ids: arrify(ids),
        },
      },
    );
  };
}

export namespace DeleteThreads {
  export interface Response {
    status: string; // ??
  }
}

export type DeleteThreads = (
  ids: string | string[],
) => Promise<DeleteThreads.Response>;
