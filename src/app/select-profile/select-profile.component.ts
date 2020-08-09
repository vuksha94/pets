import { Component, OnInit } from '@angular/core';
import { PetService } from '../_services';
import { PetProfile } from '../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-profile',
  templateUrl: './select-profile.component.html',
  styleUrls: ['./select-profile.component.css']
})
export class SelectProfileComponent implements OnInit {
  myProfiles: PetProfile[];
  selectedProfile: PetProfile;
  constructor(private petService: PetService,
              private router: Router) { }
  ngOnInit() {
    this.petService.getPetProfiles()
    .subscribe(profiles => {
      this.myProfiles = profiles;
      this.selectedProfile = profiles.filter(profile => profile.profile_active === '1')[0];
    },
     error => console.log(error));
  }
  onChange(newValue: PetProfile) {
    this.selectedProfile = newValue;
    this.router.navigate([`pet-profile/basic/${newValue.profile_id}`]);
  }
}
