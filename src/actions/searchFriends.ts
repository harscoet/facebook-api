import { FacebookRequest } from '../lib/FacebookRequest';

export function searchFriends(request: FacebookRequest) {
  return async ({ search, limit }: SearchFriends.Options = {}): Promise<SearchFriends.Response> => {
    await request.init();

    const res = await request.post<SearchFriends.Response.Raw>('ajax/growth/friend_browser/checkbox.php', {
      worksWithGetMethod: true,
      withContext: true,
      parseResponse: true,
      payload: true,
      qs: {
        dpr: 2,
      },
      form: {
        how_found: 'requests_page_pymk',
        page: 'friend_browser_list',
        instance_name: 'friend-browser',
        big_pics: 1,
        social_context: 1,
        network_context: 1,
        name_input: search,
        used_typeahead: false,
      },
    });

    if (!(res && res.results && res.results.__html)) {
      return [];
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(res.results.__html, 'text/html');
    const friends: SearchFriends.Response = [];

    doc.querySelectorAll('ul > li > div').forEach($node => {
      const $id = $node.querySelector('.friendBrowserID');
      const $name = $node.querySelector('.friendBrowserNameTitle a');

      friends.push({
        id: $id ? $id.getAttribute('value') : null,
        name: $name ? $node.querySelector('.friendBrowserNameTitle a').innerHTML.replace(/<\/?span[^>]*>/g, '') : null,
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
