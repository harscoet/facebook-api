import { FacebookRequest } from '../lib/FacebookRequest';
import { arrify } from 'jsutil';

export function deleteMessages(request: FacebookRequest) {
  return async (ids: string | string[]): Promise<DeleteMessages.Response> => {
    await request.init();

    return request.post<DeleteMessages.Response>(
      'ajax/mercury/delete_messages.php',
      {
        withContext: true,
        parseResponse: true,
        payload: true,
        data: {
          message_ids: arrify(ids),
        },
      },
    );
  };
}

export namespace DeleteMessages {
  export interface Response {
    status: string; // ??
  }
}

export type DeleteMessages = (
  ids: string | string[],
) => Promise<DeleteMessages.Response>;
