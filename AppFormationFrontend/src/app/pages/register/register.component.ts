import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isInstructor: boolean = false;

  registerRequest: RegistrationRequest = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    cin: '',
    phoneNumber: '',
    dateOfBirth: '',
    company: '',
    speciality: '',
    pdfFile: '',
    workplace: '',
  };

  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    if (this.isInstructor) {
      this.authService
        .registerInstructor({
          body: this.registerRequest,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['activate-account']);
          },
          error: (err) => {
            this.errorMsg = err.error.validationErrors;
            console.log('error message is ', err.message);
          },
        });
    } else {
      
      this.authService
        .registerParticipant({
          body: this.registerRequest,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['activate-account']);
          },
          error: (err) => {
            this.errorMsg = err.error.validationErrors;
            console.log('error message is ', err.message);
          },
        });
    }
  }

  onRoleChange(event: any) {
    this.isInstructor = event.target.value === 'true';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.registerRequest.pdfFile = file;
    }
  }
}
