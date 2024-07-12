import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-participant-navbar',
  templateUrl: './participant-navbar.component.html',
  styleUrls: ['./participant-navbar.component.scss']
})
export class ParticipantNavbarComponent {
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
