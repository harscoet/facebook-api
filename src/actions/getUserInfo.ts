import { arrify } from 'jsutil';
import { FacebookRequest } from '../lib/FacebookRequest';
import { User } from '../types';

export function getUserInfo(request: FacebookRequest) {
  return async (ids: string|string[]): Promise<GetUserInfo.Response> => {
    return request.post<GetUserInfo.Response>('chat/user_info', {
      worksWithGetMethod: true,
      withContext: true,
      parseResponse: true,
      payload: true,
      form: {
        ids: arrify(ids),
      },
    });
  };
}

export namespace GetUserInfo {
  export interface Response {
    profiles: {
      [key: string]: User;
    };
  }
}

export type GetUserInfo = (ids: string|string[]) => Promise<GetUserInfo.Response>;
