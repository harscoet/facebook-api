import { binaryToDecimal } from 'jsutil';
import { Gender, User } from '../types';

const RANDOM_VALUES = 'abcdefghijklmnopqrstuvwxyz0123456789';

export function isFemale(user: User) {
  return user.gender === Gender.female_plural || user.gender === Gender.female_singular || user.gender === Gender.female_singular_guess;
}

export function isMale(user: User) {
  return user.gender === Gender.male_plural || user.gender === Gender.male_singular || user.gender === Gender.male_singular_guess;
}

export function generateOfflineThreadingID() {
  const ret = Date.now();
  const value = Math.floor(Math.random() * 4294967295);
  const str = ('0000000000000000000000' + value.toString(2)).slice(-22);
  const msgs = ret.toString(2) + str;

  return binaryToDecimal(msgs);
}

export function generateId(size: number = 8) {
  let id = '';

  for (let i = 0; i < size; i++) {
    id += RANDOM_VALUES.charAt(Math.floor(Math.random() * RANDOM_VALUES.length));
  }

  return id;
}
