import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetProfileComponent } from './add-pet-profile.component';

describe('AddPetProfileComponent', () => {
  let component: AddPetProfileComponent;
  let fixture: ComponentFixture<AddPetProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPetProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
