import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.scss']
})
export class RegisterAdminComponent {

  registerRequest: RegistrationRequest = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    cin: '',
    phoneNumber: '',
    dateOfBirth: '',
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

      this.authService.registerAdmin({
        body: this.registerRequest
      }).subscribe({
        next: () => {
          this.router.navigate(['/AdminHome/manage-users']);
        },
        error: (err) => {
          this.handleError(err);
        }
      });
    
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

