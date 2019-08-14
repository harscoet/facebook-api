import * as actions from '../actions';
import * as types from '../types';
import * as lib from '.';
import { AsyncLib } from '../lib/AsyncLib';
import { FacebookRequest } from '../lib/FacebookRequest';
import { AddFriend } from '../actions/addFriend';
import { DeleteThreads } from '../actions/deleteThreads';
import { GetAttachmentImage } from '../actions/getAttachmentImage';
import { GetPersonPhotos } from '../actions/getPersonPhotos';
import { GetFriendsActiveStatusList } from '../actions/getFriendsActiveStatusList';
import { GetFriendsList } from '../actions/getFriendsList';
import { GetThreadHistoryGraphQL } from '../actions/getThreadHistoryGraphQL';
import { GetThreadInfo } from '../actions/getThreadInfo';
import { GetThreadListInfoGraphQL } from '../actions/getThreadListInfoGraphQL';
import { GetThreadPicture } from '../actions/getThreadPicture';
import { GetThreadPictures } from '../actions/getThreadPictures';
import { GetSharedMedia } from '../actions/getSharedMedia';
import { GetUserInfo } from '../actions/getUserInfo';
import { SearchPeople } from '../actions/searchPeople';
import { SendMessage } from '../actions/sendMessage';
export declare class Facebook extends AsyncLib {
  types: typeof types;
  lib: typeof lib;
  actions: typeof actions;
  addFriend: AddFriend;
  deleteThreads: DeleteThreads;
  getAttachmentImage: GetAttachmentImage;
  getFriendsList: GetFriendsList;
  getPersonPhotos: GetPersonPhotos;
  getFriendsActiveStatusList: GetFriendsActiveStatusList;
  getThreadHistoryGraphQL: GetThreadHistoryGraphQL;
  getThreadInfo: GetThreadInfo;
  getThreadListInfoGraphQL: GetThreadListInfoGraphQL;
  getThreadPicture: GetThreadPicture;
  getThreadPictures: GetThreadPictures;
  getUserInfo: GetUserInfo;
  getSharedMedia: GetSharedMedia;
  sendMessage: SendMessage;
  searchPeople: SearchPeople;
  request: FacebookRequest;
  constructor(
    options?: FacebookRequest.DefaultOptions,
    request?: FacebookRequest,
  );
  getContext(): Promise<FacebookRequest.Context>;
  getUserId(): Promise<string>;
}
