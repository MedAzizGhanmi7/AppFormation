import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import {CodeInputModule} from 'angular-code-input';
import { InstructorHomeComponent } from './pages/instructor/instructor-home/instructor-home.component';
import { ParticipantHomeComponent } from './pages/participant/participant-home/participant-home.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminSidebarComponent } from './pages/admin/admin-sidebar/admin-sidebar.component';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { ManageCyclesComponent } from './pages/admin/manage-cycles/manage-cycles.component';
import { HttpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { ViewUserComponent } from './pages/admin/manage-users/view-user/view-user.component';
import { ViewCycleComponent } from './pages/admin/manage-cycles/view-cycle/view-cycle.component';
import { ViewSessionsComponent } from './pages/admin/manage-cycles/view-sessions/view-sessions.component';
import { InstructorNavBarComponent } from './pages/instructor/instructor-nav-bar/instructor-nav-bar.component';
import { ParticipantNavbarComponent } from './pages/participant/participant-navbar/participant-navbar.component';
import { AvailableSessionsComponent } from './pages/participant/available-sessions/available-sessions.component';
import { ParticipationsComponent } from './pages/participant/participations/participations.component';
import { PaticipantCycleComponent } from './pages/participant/paticipant-cycle/paticipant-cycle.component';
import { InstructorSessionsComponent } from './pages/instructor/instructor-sessions/instructor-sessions.component';
import { InstructorCalendarComponent } from './pages/instructor/instructor-calendar/instructor-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    InstructorHomeComponent,
    ParticipantHomeComponent,
    AdminHomeComponent,
    AdminSidebarComponent,
    ManageUsersComponent,
    ManageCyclesComponent,
    ViewUserComponent,
    ViewCycleComponent,
    ViewSessionsComponent,
    InstructorNavBarComponent,
    ParticipantNavbarComponent,
    AvailableSessionsComponent,
    ParticipationsComponent,
    PaticipantCycleComponent,
    InstructorSessionsComponent,
    InstructorCalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CodeInputModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
