import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService, AuthenticationService, DataService } from '../_services';
import { PetInfo, PetProfile, User } from '../_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.css']
})
export class PetProfileComponent implements OnInit {
  @ViewChild('modalContentEdit') modalContentEdit: TemplateRef<any>;
  @ViewChild('modalContentAddDesease') modalContentAddDesease: TemplateRef<any>;
  currentUser: User;

  selectedId: number;
  petId: string;
  type: string;
  petInfo: any;
  petImg: string;
  helpers: any; // sizes and frequencies for select inputs in edit
  selectedType: string;
  reservation: number; // 0 or 1 to signal if vet has clicked from calendar view and exam is on appointments schedule

  loadingEdit = false;
  submittedEdit = false;
  successEdit = false;

  loadingAddDesease = false;
  successAddDesease = false;

  showDeseases = false;
  showVaccination = false;
  showMedication = false;
  showExamReports = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private modal: NgbModal,
              private authService: AuthenticationService,
              private petService: PetService) { }

  ngOnInit() {
    this.currentUser = this.authService.CurrentUser;
    this.route.params.subscribe(params => {
      this.selectedId = params['id'] ? params['id'] : null;
      this.reservation = params['reservation'] ? params['reservation'] : null;
      this.type = params['type'];
      this.selectedType = this.type;

      this.petService.getPetProfile(this.type, this.selectedId)
      .subscribe(data => {
        if (data.info.success) {
          // if user has changed its selected pet => update currentUser in localstorage
          if (this.currentUser.user_data.rola === 'Pet owner' && this.type === 'basic' && this.selectedId !== null) {
            const pet_data = data.petInfo;
            this.currentUser.pet_data = pet_data;
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          }
          this.petInfo = data.petInfo;
          this.petId = data.petId;
        } else {
          console.log(data.info.msg);
        }
      });
    });
    this.helpers = this.petService.getHelpers()
    .subscribe(helpers => this.helpers = helpers);
  }

  onSubmitDetails() {
    this.loadingEdit = true;
    this.submittedEdit = true;
    this.petService.editPetProfile(this.petInfo, this.type)
    .subscribe(data => {
      if (data.success) {
        this.successEdit = true;
        this.loadingEdit = false;
      }
    });
  }

  onSubmitAddDesease() {
    this.loadingAddDesease = true;
    if (this.selectedId) {
      this.petService.editPetProfile(this.petInfo.deseases, 'deseases', this.selectedId)
      .subscribe(data => {
        if (data.success) {
          this.successAddDesease = true;
          this.loadingAddDesease = false;
        }
      });
    } else {
      this.petService.editPetProfile(this.petInfo.deseases, 'deseases')
      .subscribe(data => {
        if (data.success) {
          this.successAddDesease = true;
          this.loadingAddDesease = false;
        }
      });
    }
  }

  selectType(newType: string) {
    if (this.selectedType === newType) {
      return;
    }
    this.selectedType = newType;
    let url = `/pet-profile/${newType}`;
    if (this.currentUser.user_data.rola === 'Veterinarian') { // add pet id to route if vet reviews pet details
      url += `/${this.petId}`;
    }

    this.router.navigate([url]);
  }

  openEditModal() {
    this.modal.open(this.modalContentEdit, { size: 'sm' });
  }

  openAddDeseaseModal() {
    this.modal.open(this.modalContentAddDesease, { size: 'sm' });
  }
/*
  writeEditData(type: string) {
    if (type === 'details') {
      this.editDetailsForm = this.formBuilder.group({
        name: ['', Validators.required],
        species: ['', Validators.required],
        breed: ['', Validators.required],
        weight: ['', Validators.required],
        birthDate: ['', Validators.required]
      });
    }
  }*/

}
