import { FacebookRequest } from '../lib/FacebookRequest';
import { arrify } from 'jsutil';

export function deleteThreads(request: FacebookRequest) {
  return async (ids: string | string[]): Promise<DeleteThreads.Response> => {
    await request.init();

    return request.post<DeleteThreads.Response>(
      'ajax/mercury/delete_thread.php',
      {
        withContext: true,
        parseResponse: true,
        payload: true,
        data: {
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
