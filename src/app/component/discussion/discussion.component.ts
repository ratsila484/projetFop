import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer,MatDrawerContainer } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-discussion',
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatButtonModule,
    
  ],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class DiscussionComponent {
  showFiller = false;
}
