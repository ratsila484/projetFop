import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-message',
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './card-message.component.html',
  styleUrl: './card-message.component.css'
})
export class CardMessageComponent {
  
  actifPoint = faCircleDot;
  @Input() discussion: any;
  @Output() clickMessage = new EventEmitter<void>;
  @Output() clickToHide = new EventEmitter<void>;
  @Input() lien_pdp!:string;
  //methode appele lors du clique du bouton
  onClick(){
    this.clickMessage.emit(); //Emit l'evenement sans données
  
  }

  isHIde : boolean = false;
  isView =  false;
  onToggleView(isView : boolean){
    this.isView = !isView;
  }  //nouveua mesasge pas encore vue

  onHide(){
    this.clickToHide.emit();
  }
}
