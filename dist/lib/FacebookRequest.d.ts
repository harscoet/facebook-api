import { AxiosRequestConfig } from 'axios';
import { AsyncLib } from './AsyncLib';
export declare class FacebookRequest extends AsyncLib<FacebookRequest.DefaultOptions> {
    static domains: string[];
    static stringifyQuery(obj: any, prefix?: any): string;
    static getDomainValue(domain: FacebookRequest.Domain): string;
    static generateContextLogging(fbDtsg: string): string;
    static parseResponse<T>(response: string): T;
    static getCurrentContext(): Promise<{
        __user: string;
        __req: number;
        __rev: number;
        __a: number;
        fb_dtsg: string;
        logging: string;
    }>;
    static getCurrentMessengerContext(): Promise<{
        msgr_region: string;
    }>;
    context: FacebookRequest.Context;
    messengerContext: FacebookRequest.MessengerContext;
    get<T>(url: string, options?: FacebookRequest.Options): Promise<T>;
    post<T>(url: string, options?: FacebookRequest.Options): Promise<T>;
    getContext(): Promise<FacebookRequest.Context>;
    getMessengerContext(): Promise<FacebookRequest.MessengerContext>;
    protected request<T>(options?: FacebookRequest.Options): Promise<T>;
    protected _init(): Promise<this>;
}
export declare namespace FacebookRequest {
    enum Domain {
        default = 0,
        mobile = 1,
        messenger = 2,
    }
    interface DefaultOptions extends AsyncLib.Options {
        forceGet?: boolean;
    }
    interface Options extends AxiosRequestConfig {
        domain?: Domain;
        form?: object;
        qs?: object;
        payload?: boolean;
        graphql?: boolean;
        withContext?: boolean;
        parseResponse?: boolean;
        worksWithGetMethod?: boolean;
    }
    interface Context {
        __user: string;
        __req: number;
        __rev: number;
        __a: number;
        fb_dtsg: string;
        logging: string;
    }
    interface MessengerContext {
        msgr_region: string;
    }
}
