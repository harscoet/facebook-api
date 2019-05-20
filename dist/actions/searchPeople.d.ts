import { FacebookRequest } from '../lib/FacebookRequest';
export declare function searchPeople(
  request: FacebookRequest,
): ({ search, limit }?: SearchPeople.Options) => Promise<SearchPeople.Person[]>;
export declare namespace SearchPeople {
  interface Options {
    search?: string;
    limit?: number;
  }
  interface Person {
    id: string;
    name: string;
  }
  type Response = Person[];
}
export declare type SearchPeople = (
  options?: SearchPeople.Options,
) => Promise<SearchPeople.Response>;
