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
    component: InstructorHomeComponent
  },
  {
    path: 'ParticipantHome',
    component: ParticipantHomeComponent
  },
  {
    path: 'AdminHome',
    component: AdminHomeComponent,
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
