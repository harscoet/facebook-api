import { generateId, rand } from 'jsutil';
import { FacebookRequest } from '../lib/FacebookRequest';

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
      const url = 'https://edge-chat.messenger.com/pull';
      const { msgr_region } = await request.getMessengerContext();

      const commonQueryString = {
        channel: `p_${request.context.__user}`,
        partition: -2,
        clientid: generateId(8),
        isq: rand(10000, 99999),
        idle: 1,
        qp: 'y',
        cap: 8,
        pws: 'fresh',
        msgs_recv: 0,
        uid: request.context.__user,
        viewer_uid: request.context.__user,
        state: 'active',
      };

      const batchContext = await request.get<any>(url, {
        parseResponse: true,
        qs: {
          ...commonQueryString,
          cb: generateId(4),
          seq: 0,
          request_batch: 1,
          msgr_region,
        },
      });

      const lbInfo = batchContext.batches[0].lb_info;

      const res = await request.get<any>(url, {
        parseResponse: true,
        qs: {
          ...commonQueryString,
          cb: generateId(4),
          seq: 1,
          sticky_token: lbInfo.sticky,
          sticky_pool: lbInfo.pool,
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
