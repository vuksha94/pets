import { Component, OnInit, OnDestroy, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { AuthenticationService, AlertService} from '../_services';
import { User } from '../_models';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { environment } from '../../environments/environment';

/*
* Za jQuery i dhtmlwindow.js i dhtmlwindow.css koji su ucitani u index.html fajlu
*/
declare var jquery: any;
declare var $: any;
declare var dhtmlwindow: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('profileModal') profileModal: TemplateRef<any>;

  currentUser: User = null;
  userSubscription: Subscription;
  loggedIn: boolean;

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router,
              private modal: NgbModal) {}
  ngOnInit() {
    this.userSubscription = this.authenticationService.isLoggedIn()
      .subscribe(loggedIn => {
        if (loggedIn) {
          this.loggedIn = true;
          this.currentUser = this.authenticationService.CurrentUser;
        } else {
          this.loggedIn = false;
          this.currentUser = null;
        }
      });
  }

  openProfileModal() {
    this.modal.open(this.profileModal, { size: 'sm' });
  }


  ngOnDestroy() {
    // this.userSubscription.unsubscribe();
  }
  logOut(){
    this.alertService.success('Uspešno ste se odjavili!', true);
    this.router.navigate(['/login']);
  }


}
