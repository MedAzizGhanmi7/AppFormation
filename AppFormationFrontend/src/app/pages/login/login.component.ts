import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];
  showMessage:boolean=false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({ body: this.authRequest }).subscribe({
      next: (res) => {
        if (res instanceof Blob) {
         
          res.text().then((text) => {
            const jsonResponse = JSON.parse(text);
            console.log('Token:', jsonResponse.token);
            this.tokenService.token = jsonResponse.token;
            const roles = this.tokenService.userRoles
            console.log('roles',roles)
            if (roles.includes('PARTICIPANT')) 
              this.router.navigate(['ParticipantHome']);

            else if(roles.includes('INSTRUCTOR')){
              const verified = this.tokenService.verified;
              if(verified){
                this.router.navigate(['InstructorHome']);
              }
              else {
                this.showMessage= true;
              }


            }
            else if(roles.includes('ADMIN')) {
              this.router.navigate(['AdminHome']);
            }


          }).catch((error) => {
            console.error('Error parsing response:', error);
            this.errorMsg.push('Error parsing server response.');
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
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
