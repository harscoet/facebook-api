import { FacebookRequest } from '../lib/FacebookRequest';
import { getFrom } from 'jsutil';
import { findFromCodeTags } from '../lib/util';

export function getPersonPhotos(request: FacebookRequest) {
  return async ({ id }: GetPersonPhotos.Options): Promise<GetPersonPhotos.Response> => {
    await request.init();

    const photos: string[] = [];

    const html = await request.get<any>(`${id}/photos_all`, {
      withContext: false,
      parseResponse: false,
      payload: false,
    });

    const $doc = findFromCodeTags(html, '.fbPhotosRedesignBorderOverlay');

    if ($doc) {
      $doc.querySelectorAll('li').forEach($node => {
        const style = $node.querySelector('i').getAttribute('style');
        const thumbnail = getFrom(style, 'background-image: url(', ')');

        photos.push(thumbnail);
      });
    }

    const context = {
      collection_token: getFrom(html, 'pagelet_timeline_app_collection_', '"'),
      lst: getFrom(html, 'lst:"', '"'),
      pagelet_token: getFrom(html, 'pagelet_token:"', '"'),
    };

    return {
      context,
      photos,
    };
  };
}

export namespace GetPersonPhotos  {
  export interface Options {
    id: string;
  }

  export interface Context {
    collection_token: string;
    lst: string;
    pagelet_token: string;
  }

  export interface Response {
    context: Context;
    photos: string[];
  }
}

export type GetPersonPhotos = (options?: GetPersonPhotos.Options) => Promise<GetPersonPhotos.Response>;
