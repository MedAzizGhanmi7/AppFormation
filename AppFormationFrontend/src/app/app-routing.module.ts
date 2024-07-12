import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { register } from './services/fn/authentication/register';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { InstructorHomeComponent } from './pages/instructor/instructor-home/instructor-home.component';
import { ParticipantHomeComponent } from './pages/participant/participant-home/participant-home.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { ManageCyclesComponent } from './pages/admin/manage-cycles/manage-cycles.component';
import { ViewUserComponent } from './pages/admin/manage-users/view-user/view-user.component';
import { ViewCycleComponent } from './pages/admin/manage-cycles/view-cycle/view-cycle.component';
import { ViewSessionsComponent } from './pages/admin/manage-cycles/view-sessions/view-sessions.component';
import { AvailableSessionsComponent } from './pages/participant/available-sessions/available-sessions.component';
import { ParticipationsComponent } from './pages/participant/participations/participations.component';
import { PaticipantCycleComponent } from './pages/participant/paticipant-cycle/paticipant-cycle.component';
import { InstructorSessionsComponent } from './pages/instructor/instructor-sessions/instructor-sessions.component';
import { InstructorCalendarComponent } from './pages/instructor/instructor-calendar/instructor-calendar.component';
import { AdminAuthGuard } from './authgards/AdminAuthGuard';
import { InstructorAuthGuard } from './authgards/InstructorAuthGuard';
import { ParticipantAuthGuard } from './authgards/ParticipantAuthGuard';

const routes: Routes = [
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },

  {
    path: 'InstructorHome',
    component: InstructorHomeComponent,
    canActivate: [InstructorAuthGuard],
    children: [
      { path: 'Sessions', component: InstructorSessionsComponent },
      { path: 'Calendar', component: InstructorCalendarComponent },
     // { path: 'view-Session/:id', component: ViewSessionComponent },

    ]
  },
  {
    path: 'ParticipantHome',
    component: ParticipantHomeComponent,
    canActivate: [ParticipantAuthGuard],

    children: [
      { path: 'available-sessions/:id', component: AvailableSessionsComponent },
      { path: 'participations', component: ParticipationsComponent },
      { path: 'cycles', component: PaticipantCycleComponent },
    ]
  },
  {
    path: 'AdminHome',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'manage-cycles', component: ManageCyclesComponent },
      { path: 'view-User/:id', component: ViewUserComponent },
      { path: 'view-Cycle/:id', component: ViewCycleComponent },
      { path: 'view-Session/:id', component: ViewSessionsComponent }
    ]
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
