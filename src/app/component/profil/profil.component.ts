import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";

@Component({
  selector: 'app-profil',
  imports: [SideBarComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  user =
    {
      nom : 'RAKOTO Zafy',
      matricule : '333-666',
      CIN : '111-222-333-444',
      Service : 'Service',
      direction : 'Direction generale nkfljsdlkfjsdkljfklsdjfklsdjfjdklfjklsdjfkljd',
      Fonctions: 'Développeur fjdklsjfkldsjflkdsjfkldsjfd ljdskfjdklsf'
    }
}
