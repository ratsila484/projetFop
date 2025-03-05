import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMessageComponent } from './client-message.component';

describe('ClientMessageComponent', () => {
  let component: ClientMessageComponent;
  let fixture: ComponentFixture<ClientMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
