import { Gender, User } from '../types';

export function getFrom(str: string, startToken: string, endToken: string): string {
  const startTokenLength = startToken.length;
  const start = str.indexOf(startToken) + startTokenLength;

  if (start < startTokenLength) {
    return '';
  }

  const lastHalf = str.substring(start);
  const end = lastHalf.indexOf(endToken);

  if (end === -1) {
    throw Error(`Could not find endTime ${endToken} in the given string.`);
  }

  return lastHalf.substring(0, end);
}

export function isNil<T>(val: T): boolean {
  return val === null || val === undefined;
}

export function arrify<T>(arr: void | { [key: string]: T } | T | T[]): T[] {
  if (isNil(arr)) {
    return [];
  }

  if (Array.isArray(arr)) {
    return arr;
  }

  if (typeof arr === 'object') {
    const values = [];

    for (const i in (arr as any)) {
      if (arr.hasOwnProperty(i)) {
        values.push(arr[i]);
      }
    }

    return values as T[];
  }

  return [arr] as any as T[];
}

export function checkArrayParam(value: string, options: string[], name: string = '') {
  if (options.indexOf(value) === -1) {
    throw new Error(`Invalid ${name} ${value}. Available values: ${options.join()})`);
  }
}

export function getOffset(limit: number = 10, page?: number, offset?: number) {
  if (!isNil(offset) && !isNil(page)) {
    throw new Error('Select between offset and page option, but not both');
  }

  if (!isNil(offset)) {
    return offset;
  }

  return page && page > 1 ? limit * (page - 1) : 0;
}

export function isFemale(user: User) {
  return user.gender === Gender.female_plural || user.gender === Gender.female_singular || user.gender === Gender.female_singular_guess;
}

export function isMale(user: User) {
  return user.gender === Gender.male_plural || user.gender === Gender.male_singular || user.gender === Gender.male_singular_guess;
}

export function removeQueryUrl(val: string) {
  return val.substring(0, val.indexOf('?'));
}

export function paginateArray<T>(arr: T[], limit: number, page: number): T[] {
  const offset = getOffset(limit, page);

  return arr.slice(offset, offset + limit);
}

export function getPageNumber(total: number, limit: number) {
  return Math.floor(total / limit);
}

export function padZeros(val: string|number, len: number) {
  val = String(val);
  len = len || 2;

  while (val.length < len) {
    val = '0' + val;
  }

  return val;
}

export function binaryToDecimal(data: string) {
  let ret = '';

  while (data !== '0') {
    let end = 0;
    let fullName = '';
    let i = 0;

    for (; i < data.length; i++) {
      end = 2 * end + parseInt(data[i], 10);
      if (end >= 10) {
        fullName += '1';
        end -= 10;
      } else {
        fullName += '0';
      }
    }

    ret = end.toString() + ret;
    data = fullName.slice(fullName.indexOf('1'));
  }

  return ret;
}

export function generateOfflineThreadingID() {
  const ret = Date.now();
  const value = Math.floor(Math.random() * 4294967295);
  const str = ('0000000000000000000000' + value.toString(2)).slice(-22);
  const msgs = ret.toString(2) + str;

  return binaryToDecimal(msgs);
}
