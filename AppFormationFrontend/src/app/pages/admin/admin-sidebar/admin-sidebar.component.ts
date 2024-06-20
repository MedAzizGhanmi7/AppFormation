import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['login']);
  }
}
