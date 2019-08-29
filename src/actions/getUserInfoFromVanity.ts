import { getFrom } from 'jsutil';
import { FacebookRequest } from '../lib/FacebookRequest';

export function getUserInfoFromVanity(request: FacebookRequest) {
  return async (vanity: string): Promise<GetUserInfoFromVanity.Response> => {
    const rawResponse = await request.get<string>(vanity, {
      withContext: false,
      parseResponse: false,
      payload: false,
      domain: FacebookRequest.Domain.mobile,
    });

    return {
      id: getFrom(rawResponse, 'profile_id&quot;:', ','),
      name: getFrom(rawResponse, '<title>', '</title>'),
    };
  };
}

export namespace GetUserInfoFromVanity {
  export interface Response {
    id: string;
    name: string;
  }
}

export type GetUserInfoFromVanity = (
  vanity: string,
) => Promise<GetUserInfoFromVanity.Response>;
