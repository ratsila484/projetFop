import { Routes } from '@angular/router';
import { ActifComponent } from './component/actif/actif.component';
import { FormationComponent } from './component/formation/formation.component';
import { AppComponent } from './app.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { DiscussionComponent } from './component/discussion/discussion.component';
import { ProfilComponent } from './component/profil/profil.component';
import { Commun2Component } from './component/commun2/commun2.component';
import { HomeComponent } from './component/home/home.component';
import { VideoComponent } from './component/video/video.component';


export const routes: Routes = [
   {
      path: '',
      component: SideBarComponent
   },

   {
      path: 'formation',
      component: FormationComponent
   },
   {
      path: 'message',
      component: ActifComponent
   },
   {
      path: 'discuss',
      component: DiscussionComponent
   },
   {
      path: 'profile',
      component: ProfilComponent
   },
   {
      path: 'commun2',
      component: Commun2Component
   },
   {
      path: 'home',
      component: HomeComponent
   },
   {
      path: 'video',
      component: VideoComponent
   }
];
