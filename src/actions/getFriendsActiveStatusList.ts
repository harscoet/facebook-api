import { FacebookRequest } from '../lib/FacebookRequest';

export function getFriendsActiveStatusList(request: FacebookRequest) {
  return async ({ filterId }: GetFriendsActiveStatusList.Options = {}): Promise<GetFriendsActiveStatusList.Response> => {
    await request.init();

    const friends = {};

    const payload = await request.post<any>('buddylist_update.php', {
      domain: FacebookRequest.Domain.mobile,
      withContext: true,
      parseResponse: true,
      payload: true,
      form: {
        data_fetch: true,
        __ajax__: 1,
      },
    });

    for (const buddy of payload.buddylist) {
      if (!filterId || filterId === buddy.id) {
        friends[buddy.id] = buddy.status;
      }
    }

    return friends;
  };
}

export namespace GetFriendsActiveStatusList {
  export interface Options {
    filterId?: string;
  }

  export interface Response {
    [key: string]: number;
  }
}

export type GetFriendsActiveStatusList = (options?: GetFriendsActiveStatusList.Options) => Promise<GetFriendsActiveStatusList.Response>;
