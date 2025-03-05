import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-client-message',
  imports: [],
  templateUrl: './client-message.component.html',
  styleUrl: './client-message.component.css'
})
export class ClientMessageComponent {
  @Input() message!: string;
  @Input() date!: string;
  @Input() lienPdp!:string;
  
}
