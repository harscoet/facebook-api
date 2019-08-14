import { FacebookRequest } from '../lib/FacebookRequest';

export function addFriend(request: FacebookRequest) {
  return async (id: string): Promise<AddFriend.Response> => {
    await request.init();

    return request.post<AddFriend.Response>('ajax/add_friend/action.php', {
      withContext: true,
      parseResponse: true,
      payload: true,
      qs: {
        dpr: 1,
      },
      data: {
        to_friend: id,
        action: 'add_friend',
        how_found: 'profile_button',
        ref_param: 'none',
        outgoing_id: '',
        logging_location: '',
        no_flyout_on_click: true,
        ego_log_data: '',
        http_referer: 'https://www.facebook.com/',
        floc: 'profile_button',
        frefs: ['none'],
      },
    });
  };
}

export namespace AddFriend {
  export interface Response {
    success: boolean;
  }
}

export type AddFriend = (id: string) => Promise<AddFriend.Response>;
