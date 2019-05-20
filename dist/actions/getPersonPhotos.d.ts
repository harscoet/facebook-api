import { FacebookRequest } from '../lib/FacebookRequest';
export declare function getPersonPhotos(
  request: FacebookRequest,
): ({ id }: GetPersonPhotos.Options) => Promise<GetPersonPhotos.Response>;
export declare namespace GetPersonPhotos {
  interface Options {
    id: string;
  }
  interface Context {
    collection_token: string;
    lst: string;
    pagelet_token: string;
  }
  interface Response {
    context: Context;
    photos: string[];
  }
}
export declare type GetPersonPhotos = (
  options?: GetPersonPhotos.Options,
) => Promise<GetPersonPhotos.Response>;
