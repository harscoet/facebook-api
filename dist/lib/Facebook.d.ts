import * as actions from '../actions';
import * as types from '../types';
import * as lib from '.';
import { AsyncLib } from '../lib/AsyncLib';
import { FacebookRequest } from '../lib/FacebookRequest';
import { GetAttachmentImage } from '../actions/getAttachmentImage';
import { GetFriendPhotos } from '../actions/getFriendPhotos';
import { GetFriendsActiveStatusList } from '../actions/getFriendsActiveStatusList';
import { GetFriendsList } from '../actions/getFriendsList';
import { GetThreadHistoryGraphQL } from '../actions/getThreadHistoryGraphQL';
import { GetThreadInfo } from '../actions/getThreadInfo';
import { GetThreadListInfo } from '../actions/getThreadListInfo';
import { GetThreadListInfoGraphQL } from '../actions/getThreadListInfoGraphQL';
import { GetThreadPicture } from '../actions/getThreadPicture';
import { GetThreadPictures } from '../actions/getThreadPictures';
import { GetUserInfo } from '../actions/getUserInfo';
import { SearchFriends } from '../actions/searchFriends';
import { SendMessage } from '../actions/sendMessage';
export declare class Facebook extends AsyncLib {
    types: typeof types;
    lib: typeof lib;
    actions: typeof actions;
    getAttachmentImage: GetAttachmentImage;
    getFriendsList: GetFriendsList;
    getFriendPhotos: GetFriendPhotos;
    getFriendsActiveStatusList: GetFriendsActiveStatusList;
    getThreadHistoryGraphQL: GetThreadHistoryGraphQL;
    getThreadInfo: GetThreadInfo;
    getThreadListInfo: GetThreadListInfo;
    getThreadListInfoGraphQL: GetThreadListInfoGraphQL;
    getThreadPicture: GetThreadPicture;
    getThreadPictures: GetThreadPictures;
    getUserInfo: GetUserInfo;
    sendMessage: SendMessage;
    searchFriends: SearchFriends;
    private _request;
    constructor(options?: FacebookRequest.DefaultOptions, request?: FacebookRequest);
    getContext(): Promise<FacebookRequest.Context>;
    getUserId(): Promise<string>;
}
