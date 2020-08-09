import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetProfileBasicComponent } from './pet-profile-basic.component';

describe('PetProfileBasicComponent', () => {
  let component: PetProfileBasicComponent;
  let fixture: ComponentFixture<PetProfileBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetProfileBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetProfileBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
