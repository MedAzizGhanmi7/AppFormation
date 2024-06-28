import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logout } from 'src/app/services/fn/authentication/logout';
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];
  showMessage: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}


  ngOnInit(): void {
    
    this.logout();
    
  }

  logout(){
    this.authService.logout().subscribe();
    this.tokenService.clearToken();
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({ body: this.authRequest }).subscribe({
      next: (res) => {
        if (res instanceof Blob) {
          res.text().then((text) => {
            try {
              const jsonResponse = JSON.parse(text);
              console.log('Token:', jsonResponse.token);
              this.tokenService.token = jsonResponse.token;
              const roles = this.tokenService.userRoles;

              if (roles.includes('PARTICIPANT'))
                this.router.navigate(['ParticipantHome']);
              else if (roles.includes('INSTRUCTOR'))
                this.router.navigate(['InstructorHome']);
              else if (roles.includes('ADMIN'))
                this.router.navigate(['AdminHome']);
            } catch (error) {
              console.error('Error parsing response:', error);
              this.errorMsg.push('Error parsing server response.');
            }
          });
        } else {
          console.log('Response:', res);
          if (res && res.token) {
            console.log('Token:', res.token);
            this.tokenService.token = res.token as string;
          } else {
            this.errorMsg.push('Invalid response from server');
          }
        }
      },
      error: (err) => {
        console.log('Error object:', err);
        if (err.error instanceof Blob) {
          err.error.text().then((text : string) => {
            const jsonError = JSON.parse(text);
            if (jsonError.validationErrors) {
              this.errorMsg = jsonError.validationErrors;
            } else if (jsonError.businessErrorDescription) {
              this.errorMsg.push(jsonError.businessErrorDescription);
            } else if (jsonError.error) {
              this.errorMsg.push(jsonError.error);
            } else {
              this.errorMsg.push('An unknown error occurred.');
            }
          }).catch((parseError : Error) => {
            console.error('Error parsing Blob:', parseError);
            this.errorMsg.push('Error parsing server response.');
          });
        } else if (err.error) {
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else if (err.error.businessErrorDescription) {
            this.errorMsg.push(err.error.businessErrorDescription);
          } else if (err.error.error) {
            this.errorMsg.push(err.error.error);
          } else {
            this.errorMsg.push('An unknown error occurred.');
          }
        } else {
          this.errorMsg.push('An unknown error occurred.');
        }
      },
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
