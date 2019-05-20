import { binaryToDecimal } from 'jsutil';
import { Gender, User } from '../types';

export function isFemale(user: User) {
  return (
    user.gender === Gender.female_plural ||
    user.gender === Gender.female_singular ||
    user.gender === Gender.female_singular_guess
  );
}

export function isMale(user: User) {
  return (
    user.gender === Gender.male_plural ||
    user.gender === Gender.male_singular ||
    user.gender === Gender.male_singular_guess
  );
}

export function generateOfflineThreadingID() {
  const ret = Date.now();
  const value = Math.floor(Math.random() * 4294967295);
  const str = ('0000000000000000000000' + value.toString(2)).slice(-22);
  const msgs = ret.toString(2) + str;

  return binaryToDecimal(msgs);
}

export function parseHtmlFromString(value: string) {
  return new DOMParser().parseFromString(value, 'text/html');
}

export function parseCommentedHtmlFromString(value: string) {
  return parseHtmlFromString(value.slice(5, -4));
}

export function findFromCodeTags(
  htmlStringOrHtmlDom: string | Document,
  selector: string,
) {
  let html: Document;

  if (typeof htmlStringOrHtmlDom === 'string') {
    html = parseHtmlFromString(htmlStringOrHtmlDom);
  }

  const $codes = html.querySelectorAll('code');
  let $container;

  $codes.forEach($code => {
    const $candidateContainer = parseCommentedHtmlFromString(
      $code.innerHTML,
    ).querySelector(selector);

    if ($candidateContainer) {
      $container = $candidateContainer;

      return;
    }
  });

  return $container;
}
