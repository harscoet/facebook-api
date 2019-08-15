import { FacebookRequest } from '../lib/FacebookRequest';
export declare function resolveMediaUrl(request: FacebookRequest): (mediaId: string) => Promise<string>;
export declare type ResolveMediaUrl = (mediaId: string) => Promise<string>;
