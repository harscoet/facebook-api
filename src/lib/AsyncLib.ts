export abstract class AsyncLib<T extends AsyncLib.Options = AsyncLib.Options> {
  public static sleep(delay: number = 1) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  protected _ready: boolean = false;
  protected _busy: boolean = false;
  protected _options: T;

  constructor(options: T = {} as T) {
    this._options = options;
  }

  public get delay(): number {
    return this._options.asyncWaitDelay;
  }

  public set delay(delay: number) {
    this._options.asyncWaitDelay = delay;
  }

  public async initAsyncDependencies(): Promise<this> {
    const deps = [];

    for (const property in this) {
      if (this.hasOwnProperty(property)) {
        if ((this[property] as any) instanceof AsyncLib) {
          deps.push((this[property] as any).init());
        }
      }
    }

    if (deps.length) {
      await Promise.all(deps);
    }

    return this;
  }

  public async init(noDeep?: boolean): Promise<this> {
    if (this._ready) {
      return this;
    }

    if (this._busy) {
      return this.waitReady();
    }

    this._busy = true;

    if (!noDeep) {
      await this.initAsyncDependencies();
    }

    await this._init();
    this._busy = false;
    this._ready = true;

    return this;
  }

  public async initWithoutDependencies(): Promise<this> {
    return this.init(true);
  }

  protected async waitReady(): Promise<this> {
    if (this._ready) {
      return this;
    }

    await AsyncLib.sleep(this.delay);

    return this.waitReady();
  }

  protected async _init(): Promise<this> {
    return this;
  }
}

export namespace AsyncLib {
  export interface Options {
    asyncWaitDelay?: number;
  }
}
