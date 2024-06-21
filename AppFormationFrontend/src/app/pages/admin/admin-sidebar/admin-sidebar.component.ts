import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
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
