import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { LogoutComponent } from './logout';
import { HomeComponent } from './home';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService } from './_services';
import { AlertComponent } from './_directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// import { MatIconModule, MatTooltipModule, MatBadgeModule } from '@angular/material'; // imports from Angular material
import {DemoMaterialModule} from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileModalComponent } from './_modals';
import { AddPetProfileComponent } from './add-pet-profile/add-pet-profile.component';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import { SelectProfileComponent } from './select-profile/select-profile.component';
import { ExamComponent } from './exam/exam.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { NewsComponent } from './news/news.component';
import { ShowExamComponent } from './show-exam/show-exam.component';
import { PetProfileBasicComponent } from './pet-profile-basic/pet-profile-basic.component';
import { AddNewsComponent } from './add-news/add-news.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ProfileModalComponent,
    LogoutComponent,
    AddPetProfileComponent,
    PetProfileComponent,
    SelectProfileComponent,
    ExamComponent,
    CalendarViewComponent,
    NewsFeedComponent,
    NewsComponent,
    ShowExamComponent,
    PetProfileBasicComponent,
    AddNewsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DemoMaterialModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
