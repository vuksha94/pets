import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PetService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet-profile',
  templateUrl: './add-pet-profile.component.html',
  styleUrls: ['./add-pet-profile.component.css']
})
export class AddPetProfileComponent implements OnInit {

  addPetForm: FormGroup;
  loading = false;
  submitted = false;

  fileToUpload: File = null;

  constructor(private formBuilder: FormBuilder,
              private petService: PetService,
              private router: Router) { }

  ngOnInit() {
    this.addPetForm = this.formBuilder.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      weight: ['', Validators.required],
      birthDate: ['', [Validators.required, birthDateValidator()]],
      image: ['']
    });
  }
  // uploading a photo
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // convenience getter for easy access to form fields
  get f() { return this.addPetForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.addPetForm.invalid) {
          return;
      }

      this.loading = true;

      const addPetProfile = new FormData();
      addPetProfile.append('name', this.f.name.value);
      addPetProfile.append('species', this.f.species.value);
      addPetProfile.append('breed', this.f.breed.value);
      addPetProfile.append('weight', this.f.weight.value);
      addPetProfile.append('birthDate', this.f.birthDate.value);
      addPetProfile.append('image', this.fileToUpload, this.fileToUpload.name);
      console.log(addPetProfile);
      /*const addPetProfile = {
        name: this.f.name.value,
        species: this.f.species.value,
        breed: this.f.breed.value,
        weight: this.f.weight.value,
        birthDate: this.f.birthDate.value,
        image: this.fileToUpload
      };*/

      this.petService.addPetProfile(addPetProfile)
      .subscribe(
          data => {
              if (!data.success) {
                  this.loading = false;
              } else { // create successfull
                  this.router.navigate([`pet-profile/basic/${data.profile_id}`]);
              }
          },
          error => {
              // console.log("login: greska");
              this.loading = false;
          });
  }

}

function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const birthDate = new Date(control.value).getTime();
    const forbidden = new Date().getTime() < birthDate;
    return forbidden ? {'birthDateInvalid': {value: control.value}} : null;
  };
}
