import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';


@Component({templateUrl: './logout.component.html'})
export class LogoutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout()
    .subscribe(success => {
        if (success) {
          // close shopping cart
            this.alertService.success('Uspešno ste se odjavili!', true);
            this.router.navigate(['/login']);
        }
        else {
            this.alertService.error('Greška!');
        }
    })
  }
}
