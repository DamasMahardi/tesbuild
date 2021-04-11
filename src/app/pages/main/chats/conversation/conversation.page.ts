import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService, Message, Chatting } from '../chat.service';
import { EmployeeWithNavigationProperties } from '@app-models';
import { IonContent, NavController } from '@ionic/angular';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  @ViewChild(IonContent, {static:true}) content: IonContent;

  employee1: EmployeeWithNavigationProperties = new EmployeeWithNavigationProperties();
  employee2: EmployeeWithNavigationProperties = new EmployeeWithNavigationProperties();
  chatList: Message[] = [];
  message = "";

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private chattingService: ChatService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.employee1 = new EmployeeWithNavigationProperties(params.employee1);
      this.employee2 = new EmployeeWithNavigationProperties(params.employee2);
      // this.chattingService.getContact().subscribe((contact: any[]) => {
      //   let findContact = contact.find(c => c.userId == this.employee2.employee.userId);
      //   if(findContact) {
      //     this.getConvertation(this.employee2.employee.userId)
      //   }
      // })

      this.getConvertation(this.employee2.employee.userId);

    });
  }

  getConvertation(targetUserId: string) {
    this.chattingService.getConvertation(targetUserId)
    .subscribe((convertation) => {
      // this.scrollToBottom();
      this.chatList = convertation.messages;
      this.chatList.sort(() => {
        return -1;
      });
    }, (error) => {
      console.log(error)
    });
  }

  user_profile(employee: EmployeeWithNavigationProperties) {
    this.navCtrl.navigateForward('/auth/user-profile', {
      queryParams: {
        employee: employee
      }
    });
  }

  send() {
    let chatting = new Chatting();
    chatting.message = this.message;
    chatting.targetUserId = this.employee2.employee.userId;
    this.chattingService.sendMessage(chatting)
    .subscribe(() => {
      this.message = "";
      this.getConvertation(this.employee2.employee.userId);
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }, (error) => {
      console.log(error)
    });
  }

  scrollToBottom() {
    this.content.scrollToBottom(800)
  }
}
