import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { loginData, logoutData } from '../_interfaces';

import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { User } from '../_models';



@Injectable()
export class AuthenticationService {
    private loggedInSubject = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient, private alertService: AlertService) {
                    if (this.CurrentUser) {
                        this.loggedInSubject.next(true);
                    } else {
                        this.loggedInSubject.next(false);
                    }
                 }
    get CurrentUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
    isLoggedIn(): Observable<boolean> {
        return this.loggedInSubject.asObservable();
    }
    login(username: string, password: string): Observable<loginData> {
        return this.http.post<loginData>(`${environment.apiUrl}/php/login.php`, { username: username, password: password })
            .pipe(map(data => {
                if (data && data.success) {
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    this.loggedInSubject.next(true);
                }
                return data;
            }));
    }
    logout(): Observable<boolean> {
        localStorage.removeItem('currentUser');
        this.loggedInSubject.next(false);
        return this.http.get<logoutData>(`${environment.apiUrl}/php/logout.php`)
            .pipe(map(data => {
                return data.success;
            }));
    }

}
