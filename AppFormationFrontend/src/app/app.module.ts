import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
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
    ManageCyclesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodeInputModule
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
