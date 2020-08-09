import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { HomeComponent } from './home';
import { LogoutComponent } from './logout';
import { AddPetProfileComponent } from './add-pet-profile/add-pet-profile.component';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import { ExamComponent } from './exam/exam.component';
import { RegisterComponent } from './register';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { NewsComponent } from './news/news.component';
import { ShowExamComponent } from './show-exam/show-exam.component';
import { AddNewsComponent } from './add-news/add-news.component';

const routes: Routes = [
  { path: '', component: NewsFeedComponent},
  { path: 'news/add', component: AddNewsComponent, canActivate: [AuthGuard] },
  { path: 'news/:id', component: NewsComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'add-pet-profile', component: AddPetProfileComponent, canActivate: [AuthGuard] },
  { path: 'pet-profile/:type', component: PetProfileComponent, canActivate: [AuthGuard] },
  { path: 'pet-profile/:type/:id', component: PetProfileComponent, canActivate: [AuthGuard] },
  { path: 'pet-profile/:type/:id/:reservation', component: PetProfileComponent, canActivate: [AuthGuard] },
  { path: 'exam/:action/:id/:reservation', component: ExamComponent, canActivate: [AuthGuard] },
  { path: 'exam/:id', component: ShowExamComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
