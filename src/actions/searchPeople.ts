import { FacebookRequest } from '../lib/FacebookRequest';
import { findFromCodeTags } from '../lib/util';

export function searchPeople(request: FacebookRequest) {
  return async ({ search, limit }: SearchPeople.Options = {}): Promise<
    SearchPeople.Response
  > => {
    await request.init();

    const people: SearchPeople.Person[] = [];

    if (!search) {
      return people;
    }

    const res = await request.get<string>(`search/people/?q=${search}`, {
      withContext: false,
      parseResponse: false,
      payload: false,
    });

    const $doc = findFromCodeTags(res, '#BrowseResultsContainer');

    if ($doc) {
      $doc.querySelectorAll('div[data-bt][data-ft]').forEach($node => {
        people.push({
          id: JSON.parse($node.getAttribute('data-bt')).id,
          name: $node.querySelector('._32mo span').innerHTML,
        });
      });
    }

    return limit ? people.slice(0, limit) : people;
  };
}

export namespace SearchPeople {
  export interface Options {
    search?: string;
    limit?: number;
  }

  export interface Person {
    id: string;
    name: string;
  }

  export type Response = Person[];
}

export type SearchPeople = (
  options?: SearchPeople.Options,
) => Promise<SearchPeople.Response>;
