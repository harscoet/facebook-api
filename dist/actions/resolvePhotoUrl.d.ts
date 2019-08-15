import { FacebookRequest } from '../lib/FacebookRequest';
export declare function resolvePhotoUrl(request: FacebookRequest): (photoId: string) => Promise<string>;
export declare type ResolvePhotoUrl = (photoId: string) => Promise<string>;
