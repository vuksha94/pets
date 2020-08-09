import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { InfoData } from '../_models';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    isLoggedIn() {// used in AuthGuard
        return this.http.get<LoggedIn>(`${environment.apiUrl}/php/is_logged_in.php`);
    }

    register(user: any): Observable<InfoData> {
        return this.http.post<InfoData>(`${environment.apiUrl}/php/register.php`, user);
    }

}

interface LoggedIn {
    loggedIn: boolean;
}