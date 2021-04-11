import { Injectable } from '@angular/core';
import { HttpService } from '@app/services/http.service';
import { Observable } from 'rxjs';

export class Chatting {
  targetUserId: string;
  message: string;

  constructor(model?) {
    model = model || {};
    this.targetUserId = model.targetUserId || null;
    this.message = model.message || null;
  }
}

export class Contact {
  userId: string;
  name: string;
  surname: string;
  username: string;
  lastMessageSide: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadMessageCount: number;

  constructor(model?) {
    model = model || {};
    this.userId = model.userId || null;
    this.name = model.name || null;
    this.surname = model.surname || null;
    this.username = model.username || null;
    this.lastMessageSide = model.lastMessageSide || null;
    this.lastMessage = model.lastMessage || null;
    this.lastMessageDate = model.lastMessageDate || null;
    this.unreadMessageCount = model.unreadMessageCount || 0;
  }
}

export class Message {
  isRead: boolean;
  message: string;
  messageDate: Date;
  readDate: Date
  side: number;

  constructor(model?) {
    model = model || {};
    this.isRead = model.isRead || false;
    this.message = model.message || null;
    this.messageDate = model.messageDate || null;
    this.readDate = model.readDate || null;
    this.side = model.side || 0;
  }
}

export class Convertation {
  messages: Message[];
  targetUserInfo: {
    name: string;
    surname: string;
    userId: string;
    username: string;
  }

  constructor(model?) {
    model = model || {};
    this.messages = model.messages || [];
    this.targetUserInfo = model.targetUserInfo || {
      name: null,
      surname: null,
      userId: null,
      username: null,
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private httpService: HttpService
  ) { }

  getEmployees(maxResultCount: number = 10, skipCount: number = 0, FilterText?: string): Observable<any> {
    FilterText = FilterText ? FilterText : "";
    return this.httpService
    .get(`/api/app/employee?MaxResultCount=${maxResultCount}&SkipCount=${skipCount}&FilterText=${FilterText}`);
  }

  getContact(): Observable<any> {
    return this.httpService.get(`/api/chat/contact/contacts`);
  }

  getConvertation(targetUserId: string): Observable<any> {
    return this.httpService.get(`/api/chat/conversation/conversation?TargetUserId=${targetUserId}`);
  }

  totalUnreadMessage(): Observable<any> {
    return this.httpService.get(`/api/chat/contact/total-unread-message-count`);
  }

  markASRead(targetUserId: string): Observable<any> {
    return this.httpService.post(`/api/chat/conversation/mark-conversation-as-read`, { targetUserId: targetUserId });
  }

  sendMessage(data: Chatting): Observable<any> {
    return this.httpService.post(`/api/chat/conversation/send-message`, data);
  }

}
