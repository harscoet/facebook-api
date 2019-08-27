import { getFrom } from 'jsutil';
import { FacebookRequest } from '../lib/FacebookRequest';

export function getUserIdFromVanity(request: FacebookRequest) {
  return async (vanity: string): Promise<GetUserIdFromVanity.Response> => {
    const rawResponse = await request.get<string>(vanity, {
      withContext: false,
      parseResponse: false,
      payload: false,
      domain: FacebookRequest.Domain.mobile,
    });

    return getFrom(rawResponse, 'profile_id&quot;:', ',');
  };
}

export namespace GetUserIdFromVanity {
  export type Response = string;
}

export type GetUserIdFromVanity = (
  vanity: string,
) => Promise<GetUserIdFromVanity.Response>;
