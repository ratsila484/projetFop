import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActifComponent } from './list-actif.component';

describe('ListActifComponent', () => {
  let component: ListActifComponent;
  let fixture: ComponentFixture<ListActifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListActifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListActifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
