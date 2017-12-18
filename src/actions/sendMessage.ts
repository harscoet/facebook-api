import { FacebookRequest } from '../lib/FacebookRequest';
import { generateOfflineThreadingID } from '../lib/util';

export function sendMessage(request: FacebookRequest) {
  return async (id: string, message: string|SendMessage.Message = ''): Promise<SendMessage.Response> => {
    await request.init();

    if (typeof message === 'string') {
      message = {
        body: message,
      };
    }

    const messageId = generateOfflineThreadingID();

    const form = {
      client: 'mercury',
      action_type: 'ma-type:user-generated-message',
      timestamp: Date.now(),
      is_spoof_warning: false,
      source: 'source:chat:web',
      tags: ['bnp:trigger:messenger_web'],
      body: message.body ? String(message.body) : '',
      offline_threading_id: messageId,
      message_id: messageId,
      other_user_fbid: id,
      ephemeral_ttl_mode: '0',
      has_attachment: !!(message.attachment || message.url || message.sticker),
      specific_to_list: [`fbid:${id}`, `fbid:${request.context.__user}`],
    };

    return request.post<SendMessage.Response>('messaging/send', {
      worksWithGetMethod: true,
      withContext: true,
      parseResponse: true,
      payload: true,
      qs: {
        dpr: 2,
      },
      form,
    });
  };
}

export namespace SendMessage {
  export interface Message {
    body: string;
    attachment?: any;
    url?: string;
    sticker?: any;
  }

  export interface Response {
    status: string; // ??
  }
}

export type SendMessage = (id: string, message: string|SendMessage.Message) => Promise<SendMessage.Response>;
