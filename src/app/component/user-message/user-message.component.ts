import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-message',
  imports: [],
  templateUrl: './user-message.component.html',
  styleUrl: './user-message.component.css'
})
export class UserMessageComponent {
  @Input() message!: string;
  @Input() date!: string;
  @Input() lienPdp!: string;
}
