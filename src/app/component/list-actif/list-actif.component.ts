import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-actif',
  imports: [],
  templateUrl: './list-actif.component.html',
  styleUrl: './list-actif.component.css'
})
export class ListActifComponent {
  @Input() nom!:string;
  @Input() lien_pdp!:string;
  @Output() clickMessageActif = new EventEmitter<void>;
  //passser un variable dans un component children dans un parent
  onClick(){
    this.clickMessageActif.emit();
  }
} 
