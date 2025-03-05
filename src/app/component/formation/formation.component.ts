import { Component, EventEmitter, NgModule, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { MatButton, MatButtonModule, MatFabButton } from '@angular/material/button';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field'
import { MatInput, MatInputModule } from '@angular/material/input'
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ListFormationComponent } from "../list-formation/list-formation.component";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { elementAt } from 'rxjs';
import { Interface } from 'node:readline';


@Component({
  selector: 'app-formation',
  imports: [
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    SideBarComponent,
    MatListModule,
    CommonModule
  ],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.css'
})
export class FormationComponent implements OnInit{
  formationListes = [
    {
      nom: "Formation 1",
      description: "description 1",
      responsable: "Responsable foramtion1",
      cheminPhoto: "#",
      statut: false
    },
    {
      nom: "Formation 2",
      description: "description 1",
      responsable: "Responsable foramtion1",
      cheminPhoto: "#",
      statut: false
    }
  ]
  liste : string[] = [];

  
  inscriptionFormation(nomFormation: string) {
    this.formationListes.forEach(item =>{
      if(nomFormation == item.nom){
        alert(item.nom)
        this.liste.push(item.nom);
        
        console.log(this.liste);
      }
      
    })
  }

  ajouterUtilisateur(user:Iuser,nomFormation:string){
    user.formationInscrit.push(nomFormation);
    user.formationInscrit.forEach(element => {
      console.log(element)
    });
  }
  ngOnInit(): void {
    this.formationListes;
    
  }

}

interface Iuser{
  idUser : number,
  formationInscrit : string[]
}

