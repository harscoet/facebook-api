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
import { ResolveMediaUrl } from '../actions/resolveMediaUrl';
import { GetUserInfoFromVanity } from '../actions/getUserInfoFromVanity';

export class Facebook extends AsyncLib {
  public types = types;
  public lib = lib;
  public actions = actions;

  public addFriend: AddFriend;
  public deleteThreads: DeleteThreads;
  public getAttachmentImage: GetAttachmentImage;
  public getFriendsList: GetFriendsList;
  public getPersonPhotos: GetPersonPhotos;
  public getFriendsActiveStatusList: GetFriendsActiveStatusList;
  public getThreadHistoryGraphQL: GetThreadHistoryGraphQL;
  public getThreadInfo: GetThreadInfo;
  public getThreadListInfoGraphQL: GetThreadListInfoGraphQL;
  public getThreadPicture: GetThreadPicture;
  public getThreadPictures: GetThreadPictures;
  public getUserInfo: GetUserInfo;
  public getSharedMedia: GetSharedMedia;
  public sendMessage: SendMessage;
  public searchPeople: SearchPeople;
  public resolveMediaUrl: ResolveMediaUrl;
  public getUserInfoFromVanity: GetUserInfoFromVanity;

  public request: FacebookRequest;

  constructor(
    options: FacebookRequest.DefaultOptions = {},
    request?: FacebookRequest,
  ) {
    super(options);
    this.request = request ? request : new FacebookRequest(options);
  }

  public getContext() {
    return this.request.getContext();
  }

  public async getUserId(): Promise<string> {
    return (await this.getContext()).__user;
  }
}

for (const i in actions) {
  if (actions.hasOwnProperty(i)) {
    Facebook.prototype[i] = function() {
      return actions[i](this.request).apply(this, arguments);
    };
  }
}
