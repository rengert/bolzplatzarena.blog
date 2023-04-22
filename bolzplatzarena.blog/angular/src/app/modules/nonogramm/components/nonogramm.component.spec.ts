import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonogrammComponent } from './nonogramm.component';

describe('NonogrammComponent', () => {
  let component: NonogrammComponent;
  let fixture: ComponentFixture<NonogrammComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonogrammComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonogrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
