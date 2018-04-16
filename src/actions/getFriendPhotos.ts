import { FacebookRequest } from '../lib/FacebookRequest';
import { getFrom } from 'jsutil';

function parseCommentedHtml(html) {
  return new DOMParser().parseFromString(html.slice(5, -4), 'text/html');
}

export function getFriendPhotos(request: FacebookRequest) {
  return async ({ id }: GetFriendPhotos.Options): Promise<GetFriendPhotos.Response> => {
    await request.init();

    const html = await request.get<any>(`${id}/photos_all`, {
      withContext: false,
      parseResponse: false,
      payload: false,
    });

    const context = {
      collection_token: getFrom(html, 'pagelet_timeline_app_collection_', '"'),
      lst: getFrom(html, 'lst:"', '"'),
      pagelet_token: getFrom(html, 'pagelet_token:"', '"'),
    };

    const photos = [];
    const parser = new DOMParser();
    const $document = parser.parseFromString(html, 'text/html');
    const $codes = $document.querySelectorAll('code');
    let $container;

    $codes.forEach($code => {
      const $candidateContainer = parseCommentedHtml($code.innerHTML)
        .querySelector('.fbPhotosRedesignBorderOverlay');

      if ($candidateContainer) {
        $container = $candidateContainer;

        return;
      }
    });

    if ($container) {
      $container.querySelectorAll('li').forEach($node => {
        const style = $node.querySelector('i').getAttribute('style');
        const thumbnail = getFrom(style, 'background-image: url(', ')');

        photos.push(thumbnail);
      });
    }

    return {
      context,
      photos,
    };
  };
}

export namespace GetFriendPhotos  {
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

export type GetFriendPhotos = (options?: GetFriendPhotos.Options) => Promise<GetFriendPhotos.Response>;
