import { FacebookRequest } from '../lib/FacebookRequest';
export declare function resolveVideoUrl(request: FacebookRequest): (videoId: string) => Promise<string>;
export declare type ResolveVideoUrl = (videoId: string) => Promise<string>;
