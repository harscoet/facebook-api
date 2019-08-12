import { AxiosRequestConfig, CancelTokenSource } from 'axios';
import { AsyncLib } from './AsyncLib';
export declare class FacebookRequest extends AsyncLib<FacebookRequest.DefaultOptions> {
    static domains: string[];
    static request(options: AxiosRequestConfig, transform?: (payload: any) => any): Promise<any>;
    static stringifyQuery(obj: any, prefix?: string): string;
    static getDomainValue(domain: FacebookRequest.Domain): string;
    static generateContextLogging(fbDtsg: string): string;
    static parseResponse<T>(response: string): T;
    static getCurrentContext(): Promise<any>;
    static getCurrentMessengerContext(): Promise<any>;
    private static readonly isDev;
    context: FacebookRequest.Context;
    messengerContext: FacebookRequest.MessengerContext;
    tokenSource: CancelTokenSource;
    constructor(options?: FacebookRequest.DefaultOptions);
    get<T>(url: string, options?: FacebookRequest.Options): Promise<T>;
    post<T>(url: string, options?: FacebookRequest.Options): Promise<T>;
    getContext(): Promise<FacebookRequest.Context>;
    getMessengerContext(): Promise<FacebookRequest.MessengerContext>;
    cancel(message?: string): void;
    protected request<T>(options?: FacebookRequest.Options): Promise<T>;
    protected _init(): Promise<this>;
}
export declare namespace FacebookRequest {
    enum Domain {
        default = 0,
        mobile = 1,
        messenger = 2
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
