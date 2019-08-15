import { FacebookRequest } from '../lib/FacebookRequest';
import { GraphQL, Image, Dimensions } from '../types';
export declare function getSharedMedia(request: FacebookRequest): ({ after, first, id, }: GetSharedMedia.Request) => Promise<GraphQL.Connection<GetSharedMedia.Response.Node>>;
export declare namespace GetSharedMedia {
    interface Request {
        id: string;
        first?: number;
        after?: string;
    }
    namespace Response {
        namespace Node {
            enum Kind {
                MessageImage = "MessageImage",
                MessageVideo = "MessageVideo",
                MessageFile = "MessageFile",
                MessageAudio = "MessageAudio"
            }
        }
        interface Node {
            __typename: Node.Kind;
            id: string;
            image: Image;
            image1: Image;
            image2: Image;
            legacy_attachment_id: string;
            original_dimensions: Dimensions;
            photo_encodings: any[];
        }
        interface Raw {
            [key: string]: {
                message_shared_media: GraphQL.Connection<Node>;
            };
        }
    }
    type Response = GraphQL.Connection<Response.Node>;
}
export declare type GetSharedMedia = (options?: GetSharedMedia.Request) => Promise<GetSharedMedia.Response>;
