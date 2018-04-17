import { getFrom } from 'jsutil';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import { AsyncLib } from './AsyncLib';

export class FacebookRequest extends AsyncLib<FacebookRequest.DefaultOptions> {
  public static domains = [
    'https://www.facebook.com',
    'https://m.facebook.com',
    'https://www.messenger.com',
  ];

  public static stringifyQuery(obj, prefix?) {
    const pairs = [];

    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      const value = obj[key];
      const enkey = encodeURIComponent(key);
      let pair;

      if (typeof value === 'object') {
        pair = FacebookRequest.stringifyQuery(value, prefix ? prefix + '[' + enkey + ']' : enkey);
      } else {
        pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value);
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
      throw new Error(`Invalid domain, possible values: ${FacebookRequest.domains.join()}`);
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
    const { data: html } = await axios.get(FacebookRequest.getDomainValue(FacebookRequest.Domain.default));

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
  }

  public static async getCurrentMessengerContext() {
    const { data } = await axios.get('/messages', {
      baseURL: FacebookRequest.getDomainValue(FacebookRequest.Domain.default),
    });

    return {
      msgr_region: getFrom(data, '"msgr_region":"', '"'),
    };
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

  protected async request<T>(options: FacebookRequest.Options = {}): Promise<T> {
    await this.init();

    const { url, domain, form, data, qs, withContext, parseResponse, payload, method } = options;
    const domainValue = FacebookRequest.getDomainValue(domain);

    if (withContext && this.context) {
      this.context.__req++;
    }

    const fullData = Object.assign({}, withContext ? this.context : {}, data, form);
    const dataString = FacebookRequest.stringifyQuery(fullData);
    const params = method === 'get' && withContext ? { ...this.context, ...qs } : qs;

    const ajaxOptions = Object.assign({}, options, {
      method: this._options.forceGet && options.worksWithGetMethod ? 'get' : options.method,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      url,
      params,
      baseURL: domainValue,
      data: new URLSearchParams(dataString),
      cancelToken: this.tokenSource.token,
    });

    if (options.graphql) {
      ajaxOptions.responseType = 'text';
    }

    let parsedResponse;
    const rawResponse = (await axios(ajaxOptions)).data;

    if (options.graphql) {
      parsedResponse = rawResponse.split('\r\n').map(JSON.parse);
    } else {
      parsedResponse = parseResponse ? FacebookRequest.parseResponse<T>(rawResponse) : rawResponse;
    }

    return payload ? parsedResponse.payload : parsedResponse;
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
    form?: object;
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
