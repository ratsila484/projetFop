import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageResponsiveComponent } from './send-message-responsive.component';

describe('SendMessageResponsiveComponent', () => {
  let component: SendMessageResponsiveComponent;
  let fixture: ComponentFixture<SendMessageResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMessageResponsiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendMessageResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
