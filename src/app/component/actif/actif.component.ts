import { Component, Input, OnInit } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { DiscussionComponent } from "../discussion/discussion.component";
import { MatFormField, matFormFieldAnimations, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CardMessageComponent } from "../card-message/card-message.component";
import { ListFormationComponent } from "../list-formation/list-formation.component";
import { SendMessageComponent } from "../send-message/send-message.component";
import { ListActifComponent } from "../list-actif/list-actif.component";
import { SendMessageResponsiveComponent } from "../send-message-responsive/send-message-responsive.component";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";


@Component({
  selector: 'app-actif',
  imports: [
    SideBarComponent,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    CardMessageComponent,
    SendMessageComponent,
    ListActifComponent,
    SendMessageResponsiveComponent
],
  templateUrl: './actif.component.html',
  styleUrl: './actif.component.css'
})
export class ActifComponent implements OnInit{

  constructor(private breakpointObserver: BreakpointObserver){}

  search = faSearch;

  //variable ecouter par list-actif-component
  formatNom(nom: string) {
    return nom;
  }

  //initialisation de la liste
  listDiscussion = [
    {
      destinataire: 'Ratsiory',
      message: [
        {
          mess: 'Kez',
          sendData: '1212'
        }
      ],
      date: 'today',
      lienPdp: "userpdp.jpg"
    },
    {
      destinataire: 'Rakoto',
      message: [
        {
          mess: 'Manaona',
          sendData: '01/05/12'
        }
      ],
      date: 'omaly',
      lienPdp: "mado.png"
    },
    {
      destinataire: "rakotodsds",
      message: [
        {
          mess: 'manjakely',
          sendData: '01/05/12'
        }
      ],
      date: 'today',
      lienPdp: "userpdp.jpg"
    },
    {
      destinataire: "rakotodsad",
      message: [
        {
          mess: 'manjakely',
          sendData: '01/05/12'
        }
      ],
      date: 'today',
      lienPdp: "userpdp.jpg"
    },
    {
      destinataire: "rakotoazerae",
      message: [
        {
          mess: 'manjakely',
          sendData: '01/05/12'
        }
      ],
      date: 'today',
      lienPdp: "userpdp.jpg"
    },{
      destinataire: "rakotokmlk",
      message: [
        {
          mess: 'manjakely',
          sendData: '01/05/12'
        }
      ],
      date: 'today',
      lienPdp: "userpdp.jpg"
    }
    ,{
      destinataire: "rakotovnb",
      message: [
        {
          mess: 'manjakely',
          sendData: '01/05/12'
        }
      ],
      date: 'today',
      lienPdp: "userpdp.jpg"
    },
    {
      destinataire: "rakoto123",
      message: [
        {
          mess: 'manjakely',
          sendData: '01/05/12'
        }
      ],
      date: 'today',
      lienPdp: "userpdp.jpg"
    },
    {
      destinataire: "rakoto123",
      message: [
        {
          mess: 'manjakely',
          sendData: '01/05/12'
        }
      ],
      date: 'today',
      lienPdp: "userpdp.jpg"
    },
    {
      destinataire: "rakoto123",
      message: [
        {
          mess: 'manjakely',
          sendData: '01/05/12'
        }
      ],
      date: 'today',
      lienPdp: "userpdp.jpg"
    }
  ]

  sendMessageData: any;
  nomDestinataireSend!: string;
  nomMessage = "Rakoto";
  date = "today";

  dateSendedMessage = new Date();
  //Methode qui est appele lorsque l'evenement est reçu du composant enfant
  onMessagereceived(nomDestinataire: string) {
    this.listDiscussion.filter(item => {
      return item.destinataire == nomDestinataire;
    });
    console.log(this.nomDestinataireSend)
    this.sendMessageData = this.listDiscussion;
    this.nomMessage = nomDestinataire;
    this.formatNom("Razafimahatartartra");
  }

  isHide: boolean = false; //controle la visibilite de 
  isSmallScreen: boolean = false;

  ngOnInit(): void {
    this.breakpointObserver.observe([`(max-width: 1000px)`]).subscribe(result=>{
      this.isSmallScreen = result.matches;
    })
  }

  toggleComponent():void{
    this.isHide = !this.isHide;
  }
}

//algo de tri en fonction des personnes des discussion
interface Message {
  mess: string;
  sendData: string;
}



interface Discussion {
  destinataire: string;
  message: Message[];
  date: string;
  lienPdp: string;
}
