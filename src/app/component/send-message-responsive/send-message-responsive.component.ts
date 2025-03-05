import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faBackward, faPaperclip, faPaperPlane, faSmile, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { ClientMessageComponent } from "../client-message/client-message.component";
import { UserMessageComponent } from "../user-message/user-message.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-send-message-responsive',
  imports: [
    FontAwesomeModule,
    
    FormsModule
  ],
  templateUrl: './send-message-responsive.component.html',
  styleUrl: './send-message-responsive.component.css'
})
export class SendMessageResponsiveComponent {
  @ViewChild('container',{read: ViewContainerRef, static:true})
  container!: ViewContainerRef;
  phone = faPhone;
  camera = faVideo;
  menu = faBars;
  fichier = faPaperclip;
  smile = faSmile;
  send = faPaperPlane;
  nom : string = "";
  backBtn = faArrowLeft;
  messageSended : StockedMessage[] = [];
  tmpMessage : StockedMessage[] = [];
  currentDate = new Date();

  @Input() sendMessageData:any;
  @Input() nomDestinataire!: string;
  @Input() lienPdp!:string;

  sendMessage(nomDestinataire:string,message:string,date:string){
    const componentRef = this.container.createComponent(UserMessageComponent);
    componentRef.instance.message = message;
    componentRef.instance.date = date;
    componentRef.instance.lienPdp = this.lienPdp;
    console.log(this.messageSended);  
    this.nom = "";                                            
  }
  recevoirMessage(message: string, date: string,nomSender : string){
    const componentRef = this.container.createComponent(ClientMessageComponent);
    componentRef.instance.message = message;
    componentRef.instance.date = date;
    componentRef.instance.lienPdp = this.lienPdp;
  }

  ngOnInit(): void {
    this.recevoirMessage(this.sendMessageData.message[0].mess,this.sendMessageData.date,this.sendMessageData.destinataire);
  }

  returnButton(){
    window.location.href = 'message'
  }
}


interface StockedMessage{
  mess : string,
  date : string
}
