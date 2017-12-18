import { User } from '../types';
export declare function getFrom(str: string, startToken: string, endToken: string): string;
export declare function isNil<T>(val: T): boolean;
export declare function arrify<T>(arr: void | {
    [key: string]: T;
} | T | T[]): T[];
export declare function checkArrayParam(value: string, options: string[], name?: string): void;
export declare function getOffset(limit?: number, page?: number, offset?: number): number;
export declare function isFemale(user: User): boolean;
export declare function isMale(user: User): boolean;
export declare function removeQueryUrl(val: string): string;
export declare function paginateArray<T>(arr: T[], limit: number, page: number): T[];
export declare function getPageNumber(total: number, limit: number): number;
export declare function padZeros(val: string | number, len: number): string;
export declare function binaryToDecimal(data: string): string;
export declare function generateOfflineThreadingID(): string;
