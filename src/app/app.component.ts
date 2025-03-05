import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "./component/side-bar/side-bar.component";
import { FormationComponent } from "./component/formation/formation.component";
import { CommonModule } from '@angular/common';
import { ActifComponent } from "./component/actif/actif.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isVisible = false; //afficher le composna târ defaut
  afficher(){
    this.isVisible = !this.isVisible;
  }
}
