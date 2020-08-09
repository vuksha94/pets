import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InfoData, PetInfoData, PetProfile } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  addPetProfile(petProfile: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/php/add_pet_profile.php`, petProfile);
  }

  addNews(addNews: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/php/add_news.php`, addNews);
  }

  editPetProfile(petInfo: any, type: string, pet_id?: number): Observable<InfoData>  {
    let url = `${environment.apiUrl}/php/edit_pet_profile.php?type=${type}`;
    if (pet_id !== undefined) {
      url += `&pet_id=${pet_id}`;
    }
    return this.http.post<InfoData>(url, petInfo);
  }

  addExam(examInfo: any): Observable<InfoData> {
    return this.http.post<InfoData>(`${environment.apiUrl}/php/add_exam.php`, examInfo);
  }

  cancelExam(examId: string): Observable<InfoData> {
    return this.http.get<InfoData>(`${environment.apiUrl}/php/cancel_exam.php?id=${examId}`);
  }

  getAppointedExaminations(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/php/get_appointed_exams.php`);
  }

  addExamAppointment(examApp: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/php/add_exam_appointment.php`, examApp);
  }

  getExamDetails(examId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/php/get_exam_details.php?id=${examId}`);
  }

  getPetProfiles(): Observable<PetProfile[]> {
    return this.http.get<PetProfile[]>(`${environment.apiUrl}/php/get_pet_profiles.php`);
  }

  getPetProfile(type: string, id?: number): Observable<PetInfoData> {
    let getUrl = `${environment.apiUrl}/php/get_pet_profile.php?type=${type}`;
    if (id !== null) {
      getUrl += `&id=${id}`;
    }
    return this.http.get<PetInfoData>(getUrl);
  }

  getHelpers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/php/get_helpers.php`);
  }

  getNewsFeed(): Observable<any>  {
    return this.http.get<any>(`${environment.apiUrl}/php/get_news_feed.php`);
  }

  getNews(id: string): Observable<any>  {
    return this.http.get<any>(`${environment.apiUrl}/php/get_news.php?id=${id}`);
  }

}
