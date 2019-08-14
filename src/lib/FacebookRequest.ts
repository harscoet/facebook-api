import { getFrom } from 'jsutil';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import { AsyncLib } from './AsyncLib';

export class FacebookRequest extends AsyncLib<FacebookRequest.DefaultOptions> {
  public static domains = [
    'https://www.facebook.com',
    'https://m.facebook.com',
    'https://www.messenger.com',
  ];

  public static async request(
    options: AxiosRequestConfig,
    transform?: (payload: any) => any,
    optionsForKey?: any,
  ) {
    const isDev = FacebookRequest.isDev;
    let sessionStorageKey: string;

    if (isDev) {
      sessionStorageKey = 'fbapi_' + JSON.stringify(optionsForKey || options);

      const responseFromSessionStorage = sessionStorage.getItem(
        sessionStorageKey,
      );

      if (responseFromSessionStorage) {
        return JSON.parse(responseFromSessionStorage);
      }
    }

    const rawResponse = (await axios(options)).data;
    const response = transform ? transform(rawResponse) : rawResponse;

    if (isDev) {
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(response));
    }

    return response;
  }

  public static stringifyQuery(obj: any, prefix?: string) {
    const pairs = [];

    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      const value = obj[key];
      const enkey = encodeURIComponent(key);
      let pair: string;

      if (typeof value === 'object') {
        pair = FacebookRequest.stringifyQuery(
          value,
          prefix ? `${prefix}[${enkey}]` : enkey,
        );
      } else {
        pair =
          (prefix ? `${prefix}[${enkey}]` : enkey) +
          '=' +
          encodeURIComponent(value);
      }

      pairs.push(pair);
    }

    return pairs.join('&');
  }

  public static getDomainValue(domain: FacebookRequest.Domain): string {
    if (!domain) {
      return FacebookRequest.domains[0];
    }

    const value = FacebookRequest.domains[domain];

    if (!value) {
      throw new Error(
        `Invalid domain, possible values: ${FacebookRequest.domains.join()}`,
      );
    }

    return value;
  }

  public static generateContextLogging(fbDtsg: string): string {
    let logging = '2';

    for (let i = 0; i < fbDtsg.length; i++) {
      logging += fbDtsg.charCodeAt(i);
    }

    return logging;
  }

  public static parseResponse<T>(response: string): T {
    const length = response.length;

    return JSON.parse(response.substring(9, length));
  }

  public static async getCurrentContext() {
    return FacebookRequest.request(
      {
        method: 'get',
        url: FacebookRequest.getDomainValue(FacebookRequest.Domain.default),
      },
      html => {
        const fbDtsg = getFrom(html, 'name="fb_dtsg" value="', '"');
        const revision = getFrom(html, 'revision":', ',');
        const userId = getFrom(html, '"USER_ID":"', '"');

        return {
          __user: userId,
          __req: 0,
          __rev: parseInt(revision, 10),
          __a: 1,
          fb_dtsg: fbDtsg,
          logging: FacebookRequest.generateContextLogging(fbDtsg),
        };
      },
    );
  }

  public static async getCurrentMessengerContext() {
    return FacebookRequest.request(
      {
        method: 'get',
        baseURL: FacebookRequest.getDomainValue(FacebookRequest.Domain.default),
        url: '/messages',
      },
      data => ({
        msgr_region: getFrom(data, '"msgr_region":"', '"'),
      }),
    );
  }

  private static get isDev(): boolean {
    return localStorage.getItem('facebook_api_is_dev') !== null;
  }

  public context: FacebookRequest.Context;
  public messengerContext: FacebookRequest.MessengerContext;
  public tokenSource: CancelTokenSource;

  constructor(options: FacebookRequest.DefaultOptions = {}) {
    super(options);
    this.tokenSource = axios.CancelToken.source();
  }

  public async get<T>(url: string, options: FacebookRequest.Options = {}) {
    return this.request<T>(Object.assign({ url, method: 'get' }, options));
  }

  public async post<T>(url: string, options: FacebookRequest.Options = {}) {
    return this.request<T>(Object.assign({ url, method: 'post' }, options));
  }

  public async getContext() {
    await this.init();

    return this.context;
  }

  public async getMessengerContext() {
    await this.init();

    return this.messengerContext;
  }

  public cancel(message?: string) {
    return this.tokenSource.cancel(message);
  }

  protected async request<T>(
    options: FacebookRequest.Options = {},
  ): Promise<T> {
    await this.init();

    const {
      url,
      domain,
      data,
      qs,
      withContext,
      parseResponse,
      payload,
      method,
    } = options;

    if (withContext && this.context) {
      this.context.__req++;
    }

    const baseRequestOptions = {
      baseURL: FacebookRequest.getDomainValue(domain),
      url,
      method:
        this._options.forceGet && options.worksWithGetMethod
          ? 'get'
          : options.method,
      params: method === 'get' && withContext ? { ...this.context, ...qs } : qs,
    };

    const requestOptions = {
      ...options,
      ...baseRequestOptions,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      cancelToken: this.tokenSource.token,
      data: new URLSearchParams(
        FacebookRequest.stringifyQuery({
          ...(withContext ? this.context : {}),
          ...data,
        }),
      ),
    };

    if (options.graphql) {
      requestOptions.responseType = 'text';
    }

    return FacebookRequest.request(
      requestOptions,
      rawResponse => {
        let parsedResponse: any;

        if (options.graphql) {
          parsedResponse = rawResponse.split('\r\n').map(JSON.parse);
        } else {
          parsedResponse = parseResponse
            ? FacebookRequest.parseResponse<T>(rawResponse)
            : rawResponse;
        }

        return payload ? parsedResponse.payload : parsedResponse;
      },
      {
        ...baseRequestOptions,
        data: withContext
          ? {
              __user: this.context.__user,
              ...data,
            }
          : data,
      },
    );
  }

  protected async _init(): Promise<this> {
    if (!this.context) {
      this.context = await FacebookRequest.getCurrentContext();
    }

    if (!this.messengerContext) {
      this.messengerContext = await FacebookRequest.getCurrentMessengerContext();
    }

    return this;
  }
}

export namespace FacebookRequest {
  export enum Domain {
    default,
    mobile,
    messenger,
  }

  export interface DefaultOptions extends AsyncLib.Options {
    forceGet?: boolean;
  }

  export interface Options extends AxiosRequestConfig {
    domain?: Domain;
    qs?: object;
    payload?: boolean;
    graphql?: boolean;
    withContext?: boolean;
    parseResponse?: boolean;
    worksWithGetMethod?: boolean;
  }

  export interface Context {
    __user: string;
    __req: number;
    __rev: number;
    __a: number;
    fb_dtsg: string;
    logging: string;
  }

  export interface MessengerContext {
    msgr_region: string;
  }
}
