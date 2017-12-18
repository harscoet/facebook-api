export declare abstract class AsyncLib<T extends AsyncLib.Options = AsyncLib.Options> {
    static sleep(delay?: number): Promise<{}>;
    protected _ready: boolean;
    protected _busy: boolean;
    protected _options: T;
    constructor(options?: T);
    delay: number;
    initAsyncDependencies(): Promise<this>;
    init(noDeep?: boolean): Promise<this>;
    initWithoutDependencies(): Promise<this>;
    protected waitReady(): Promise<this>;
    protected _init(): Promise<this>;
}
export declare namespace AsyncLib {
    interface Options {
        asyncWaitDelay?: number;
    }
}
