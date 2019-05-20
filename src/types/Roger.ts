export interface Roger {
  [key: string]: {
    [key: string]:
      | {
          watermark: number;
          action: number;
        }
      | any[];
  };
}
