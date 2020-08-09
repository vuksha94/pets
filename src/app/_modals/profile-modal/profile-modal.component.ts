import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../_services';
import { User } from '../../_models';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {

  @Input() user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // this.user = this.authenticationService.CurrentUser;
  }


}
