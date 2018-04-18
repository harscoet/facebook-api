import { FacebookRequest } from '../lib/FacebookRequest';
import { findFromCodeTags } from '../lib/util';

export function searchFriends(request: FacebookRequest) {
  return async ({ search, limit }: SearchFriends.Options = {}): Promise<SearchFriends.Response> => {
    await request.init();

    const friends: SearchFriends.Friend[] = [];

    const res = await request.get<any>(`search/people/?q=${search}`, {
      withContext: false,
      parseResponse: false,
      payload: false,
    });

    const $doc = findFromCodeTags(res, '#BrowseResultsContainer');

    $doc.querySelectorAll(':scope > div > div').forEach($node => {
      friends.push({
        id: JSON.parse($node.getAttribute('data-bt')).id,
        name: $node.querySelector('._32mo span').innerHTML,
      });
    });

    return limit ? friends.slice(0, limit) : friends;
  };
}

export namespace SearchFriends {
  export interface Options {
    search?: string;
    limit?: number;
  }

  export namespace Response {
    export interface Raw {
      extra_data: {
        __html: string;
      };
      pager: {
        __html: string;
      };
      results: {
        __html: string;
      };
    }
  }

  export interface Friend {
    id: string;
    name: string;
  }

  export type Response = Friend[];
}

export type SearchFriends = (options?: SearchFriends.Options) => Promise<SearchFriends.Response>;
