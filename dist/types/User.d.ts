import { Gender } from './Gender';
export interface User {
    id: string;
    name: string;
    firstName: string;
    vanity: string;
    thumbSrc: string;
    uri: string;
    alternateName: string;
    dir: string;
    gender: Gender;
    i18nGender: number;
    is_friend: boolean;
    is_nonfriend_messenger_contact: boolean;
    mThumbSrcLarge: string;
    mThumbSrcSmall: string;
    searchTokens: string[];
    type: string;
}
