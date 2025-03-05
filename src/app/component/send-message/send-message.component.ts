import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip, faPaperPlane, faSmile, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { ClientMessageComponent } from "../client-message/client-message.component";
import { UserMessageComponent } from "../user-message/user-message.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-send-message',
  imports: [
    FontAwesomeModule,
    
    FormsModule
],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css'
})
export class SendMessageComponent implements OnInit{
  
  @ViewChild('container',{read: ViewContainerRef, static:true})
  container!: ViewContainerRef;
  phone = faPhone;
  camera = faVideo;
  menu = faBars;
  fichier = faPaperclip;
  smile = faSmile;
  send = faPaperPlane;
  nom : string = "";
  messageSended : StockedMessage[] = [];
  tmpMessage : StockedMessage[] = [];
  currentDate = new Date();

  @Input() sendMessageData:any;
  @Input() nomDestinataire!: string;

  sendMessage(nomDestinataire:string,message:string,date:string){
    const componentRef = this.container.createComponent(UserMessageComponent);
    componentRef.instance.message = message;
    componentRef.instance.date = date;
    console.log(this.messageSended);  
    this.nom = "";                                            
  }
  recevoirMessage(message: string, date: string,nomSender : string){
    const componentRef = this.container.createComponent(ClientMessageComponent);
    componentRef.instance.message = message;
    componentRef.instance.date = date;
  }
  
  ngOnInit(): void {
    this.recevoirMessage(this.sendMessageData.message[0].mess,this.sendMessageData.date,this.sendMessageData.destinataire);
  }
  
}

interface StockedMessage{
  mess : string,
  date : string
}

