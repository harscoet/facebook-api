import { User } from '../types';
export declare function isFemale(user: User): boolean;
export declare function isMale(user: User): boolean;
export declare function generateOfflineThreadingID(): string;
export declare function parseHtmlFromString(value: string): Document;
export declare function parseCommentedHtmlFromString(value: string): Document;
export declare function findFromCodeTags(htmlStringOrHtmlDom: string | Document, selector: string): any;
