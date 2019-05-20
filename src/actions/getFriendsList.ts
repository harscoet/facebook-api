import { FacebookRequest } from '../lib/FacebookRequest';
import { isFemale, isMale } from '../lib/util';
import { Gender, User } from '../types';

export function getFriendsList(request: FacebookRequest) {
  return async ({ gender }: GetFriendsList.Options = {}): Promise<
    GetFriendsList.Response
  > => {
    await request.init();

    const payload = await request.post<GetFriendsList.Response>(
      'chat/user_info_all',
      {
        withContext: true,
        parseResponse: true,
        payload: true,
        form: {
          viewer: request.context.__user,
        },
      },
    );

    const users = {};

    for (const userId in payload) {
      if (payload.hasOwnProperty(userId)) {
        const user = payload[userId];

        if (user.is_friend) {
          if (
            !gender ||
            (typeof gender !== 'string' && user.gender === gender) ||
            ((gender === 'male' || gender === 'm') && isMale(user)) ||
            ((gender === 'female' || gender === 'f') && isFemale(user))
          ) {
            users[userId] = user;
          }
        }
      }
    }

    return users;
  };
}

export namespace GetFriendsList {
  export interface Options {
    gender?: Gender | 'male' | 'female' | 'm' | 'f';
  }

  export interface Response {
    [key: string]: User;
  }
}

export type GetFriendsList = (
  options?: GetFriendsList.Options,
) => Promise<GetFriendsList.Response>;
