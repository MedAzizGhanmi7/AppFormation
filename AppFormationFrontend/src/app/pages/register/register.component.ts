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
  selectedPDF: any;
  selectedFile: string | undefined;

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
      if (this.selectedPDF) {
        this.authService.registerInstructor({
          body: this.registerRequest
        }).subscribe({
          next: (response) => {
            this.uploadPDFFile(); // Call uploadPDFFile method after registration
          },
          error: (err) => {
            console.log('Registration error: ', err);
            this.errorMsg = err.error.validationErrors || ['An unexpected error occurred'];
          }
        });
      } else {
        this.errorMsg = ['PDF file is required for instructors'];
      }
    } else {
      this.authService.registerParticipant({
        body: this.registerRequest
      }).subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          console.log('Registration error: ', err);
          this.errorMsg = err.error.validationErrors || ['An unexpected error occurred'];
        }
      });
    }
  }

  uploadPDFFile() {
    if (this.selectedPDF) {
      this.authService.uploadFile({
        'email': this.registerRequest.email,
        body: {
          file: this.selectedPDF
        }
      }).subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          console.error('File upload error:', err);
          this.errorMsg = err.error.validationErrors || ['An unexpected error occurred'];
        }
      });
    } else {
      this.errorMsg = ['No PDF file selected'];
    }
  }

  onRoleChange(event: any) {
    this.isInstructor = event.target.value === 'true';
  }

  onFileSelected(event: any) {
    this.selectedPDF = event.target.files[0];
    console.log('Selected PDF:', this.selectedPDF);

    if (this.selectedPDF) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = reader.result as string;
      };
      reader.readAsDataURL(this.selectedPDF);
    }
  }
}
