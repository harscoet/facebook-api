import * as actions from '../actions';
import * as types from '../types';
import * as lib from '.';
import { AsyncLib } from '../lib/AsyncLib';
import { FacebookRequest } from '../lib/FacebookRequest';
import { GetAttachmentImage } from '../actions/getAttachmentImage';
import { GetFriendsActiveStatusList } from '../actions/getFriendsActiveStatusList';
import { GetFriendsList } from '../actions/getFriendsList';
import { GetThreadHistoryGraphQL } from '../actions/getThreadHistoryGraphQL';
import { GetThreadInfo } from '../actions/getThreadInfo';
import { GetThreadListInfo } from '../actions/getThreadListInfo';
import { GetThreadListInfoGraphQL } from '../actions/getThreadListInfoGraphQL';
import { GetThreadPicture } from '../actions/getThreadPicture';
import { GetThreadPictures } from '../actions/getThreadPictures';
import { GetUserInfo } from '../actions/getUserInfo';
import { SendMessage } from '../actions/sendMessage';

export class Facebook extends AsyncLib {
  public types = types;
  public lib = lib;
  public actions = actions;

  public getAttachmentImage: GetAttachmentImage;
  public getFriendsList: GetFriendsList;
  public getFriendsActiveStatusList: GetFriendsActiveStatusList;
  public getThreadHistoryGraphQL: GetThreadHistoryGraphQL;
  public getThreadInfo: GetThreadInfo;
  public getThreadListInfo: GetThreadListInfo;
  public getThreadListInfoGraphQL: GetThreadListInfoGraphQL;
  public getThreadPicture: GetThreadPicture;
  public getThreadPictures: GetThreadPictures;
  public getUserInfo: GetUserInfo;
  public sendMessage: SendMessage;

  private _request: FacebookRequest;

  constructor(options: FacebookRequest.DefaultOptions = {}, request?: FacebookRequest) {
    super(options);
    this._request = request ? request : new FacebookRequest(options);
  }

  public getContext() {
    return this._request.getContext();
  }

  public async getUserId(): Promise<string> {
    return (await this.getContext()).__user;
  }
}

for (const i in actions) {
  if (actions.hasOwnProperty(i)) {
    Facebook.prototype[i] = function() {
      return actions[i](this._request).apply(this, arguments);
    };
  }
}
