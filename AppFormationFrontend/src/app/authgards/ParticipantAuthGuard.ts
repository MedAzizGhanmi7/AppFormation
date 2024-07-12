import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipantAuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.tokenService.hasRole('PARTICIPANT')) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login or unauthorized page
      return false;
    }
  }
}
