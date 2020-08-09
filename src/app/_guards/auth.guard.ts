import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../_services';
import { Observable, of } from 'rxjs';
import { map, catchError, first } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.userService.isLoggedIn()
        .pipe(
            map(
                data => {
                    if (data.loggedIn && localStorage.getItem('currentUser')) {
                        // console.log("LoggedIn");
                        return true;
                    } else {
                        // console.log("NOT LoggedIn");
                        this.router.navigate(['/login']);
                        return false;
                    }
                }
            )
        )

    }
}