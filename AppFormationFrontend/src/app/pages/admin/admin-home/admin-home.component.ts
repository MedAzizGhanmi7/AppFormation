import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/models';
import { AuthenticationService, UserService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent  {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthenticationService
  ) {
  }

  logout() {
    this.authService.logout().subscribe();
    this.tokenService.clearToken();
    this.router.navigate(['login']);
  }
}
