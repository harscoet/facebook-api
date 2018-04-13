import { FacebookRequest } from '../lib/FacebookRequest';
import { generateId } from '../lib/util';

export function getFriendsActiveStatusList(request: FacebookRequest) {
  return async ({ filterId, legacy }: GetFriendsActiveStatusList.Options = {}): Promise<GetFriendsActiveStatusList.Response> => {
    await request.init();

    const friends = {};

    if (legacy) {
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
          friends[buddy.id] = {
            is_active: true,
          };
        }
      }
    } else {
      const res = await request.get<any>(`https://edge-chat.messenger.com/pull`, {
        parseResponse: true,
        qs: {
          channel: `p_${request.context.__user}`,
          seq: 1,
          partition: -2,
          clientid: generateId(8),
          cb: generateId(4),
          idle: 1,
          qp: 'y',
          cap: 8,
          pws: 'fresh',
          isq: 10635,
          msgs_recv: 0,
          uid: request.context.__user,
          viewer_uid: request.context.__user,
          sticky_token: 512,
          sticky_pool: 'lla1c26_chat-proxy',
          state: 'active',
        },
      });

      const buddyList = res.ms[0].buddyList;

      for (const id of Object.keys(buddyList)) {
        friends[id] = {
          lat: buddyList[id].lat,
          is_active: buddyList[id].hasOwnProperty('p') && buddyList[id].p > 0,
        };
      }
    }

    return friends;
  };
}

export namespace GetFriendsActiveStatusList {
  export interface Options {
    filterId?: string;
    legacy?: boolean;
  }

  export interface Status {
    lat?: number;
    is_active?: boolean;
  }

  export interface Response {
    [key: string]: Status;
  }
}

export type GetFriendsActiveStatusList = (options?: GetFriendsActiveStatusList.Options) => Promise<GetFriendsActiveStatusList.Response>;
