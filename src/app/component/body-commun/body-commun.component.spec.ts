import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCommunComponent } from './body-commun.component';

describe('BodyCommunComponent', () => {
  let component: BodyCommunComponent;
  let fixture: ComponentFixture<BodyCommunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyCommunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyCommunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
