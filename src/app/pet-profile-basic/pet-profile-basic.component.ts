import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pet-profile-basic',
  templateUrl: './pet-profile-basic.component.html',
  styleUrls: ['./pet-profile-basic.component.css']
})
export class PetProfileBasicComponent implements OnInit {

  @Input() pet: any;

  constructor() { }

  ngOnInit() {
  }

}
