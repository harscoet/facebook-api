import { FacebookRequest } from '../lib/FacebookRequest';
import { GraphQL, Image, Dimensions } from '../types';

export function getSharedMedia(request: FacebookRequest) {
  return async ({ after, first = 100, id }: GetSharedMedia.Request): Promise<GetSharedMedia.Response> => {
    const result = await request.post<GetSharedMedia.Response.Raw>('webgraphql/query/', {
      parseResponse: true,
      payload: true,
      withContext: true,
      qs: {
        query_id: '515216185516880',
        variables: JSON.stringify({
          id,
          after,
          first,
        }),
        dpr: 1,
      },
    });

    return result && result[id] && result[id].message_shared_media ? result[id].message_shared_media : {
      count: 0,
      edges: [],
      page_info: {
        has_next_page: false,
        has_previous_page: false,
        end_cursor: null,
        start_cursor: null,
      },
    };
  };
}

export namespace GetSharedMedia {
  export interface Request {
    id: string;
    first?: number;
    after?: string;
  }

  export namespace Response {
    export namespace Node {
      export enum Kind {
        MessageImage = 'MessageImage',
      }
    }

    export interface Node {
      __typename: Node.Kind;
      id: string;
      image: Image;
      image1: Image;
      image2: Image;
      legacy_attachment_id: string;
      original_dimensions: Dimensions;
      photo_encodings: any[];
    }

    export interface Raw {
      [key: string]: {
        message_shared_media: GraphQL.Connection<Node>;
      };
    }
  }

  export type Response = GraphQL.Connection<Response.Node>;
}

export type GetSharedMedia = (options?: GetSharedMedia.Request) => Promise<GetSharedMedia.Response>;
