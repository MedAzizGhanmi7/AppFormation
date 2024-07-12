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
            this.handleError(err);
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
          this.handleError(err);
        }
      });
    }
  }

  handleError(err: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        const errorJson = JSON.parse(reader.result as string);
        this.errorMsg = errorJson.validationErrors || ['An unexpected error occurred'];
      } catch (e) {
        this.errorMsg = ['An unexpected error occurred'];
      }
    };
    reader.onerror = () => {
      this.errorMsg = ['An unexpected error occurred'];
    };
  
    if (err.error instanceof Blob) {
      reader.readAsText(err.error);
    } else {
      this.errorMsg = err.error.validationErrors || ['An unexpected error occurred'];
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
          this.handleError(err);
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


  translateMessage(message: string): string {
    const translations: { [key: string]: string } = {
      'Firstname is mandatory': 'الاسم الأول مطلوب',
      'LastName is mandatory': 'اسم العائلة مطلوب',
      'Email is mandatory': 'البريد الإلكتروني مطلوب',
      'Email is not well formatted': 'البريد الإلكتروني غير منسق بشكل جيد',
      'Password is mandatory': 'كلمة المرور مطلوبة',
      'Password should be 8 characters long minimum': ' يجب أن تتكون كلمة المرور من 8 أحرف كحد أدنى',
      'CIN is mandatory': 'رقم الهوية مطلوب',
      'cin should be 8 characters long': '  يجب أن يكون طول بطاقة الهوية 8 أحرف',
      'Phone Number is mandatory': 'رقم الهاتف مطلوب',
      'Date of Birth is required': 'تاريخ الميلاد مطلوب',
      'File is required': 'الملف مطلوب'
    
    };
    return translations[message] || message;
  }
}
