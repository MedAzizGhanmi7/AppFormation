import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/services/models';
import { UserService } from 'src/app/services/services';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  
  userId : number =-1;
  user !: User ;
  constructor(private userService: UserService , private route : ActivatedRoute , private router :Router) {}
  
  
  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.userId = +params['id']; 

      console.log('User ID:', this.userId);

     
      if (this.userId !== -1) {
        this.userService.getUserById(this.userId).subscribe(user => {
          console.log('User details:', user);
          this.user = user;
        }, error => {
          console.error('Error fetching user details:', error);
        });
      }
    });
  }

  toggleAccount(userId: number | undefined) {
    if(userId) {
    
    if (this.user) {
      this.userService.toggleUserAccount(userId)
        .subscribe(
          (updatedUser) => {
            
            this.user.accountLocked =  !this.user.accountLocked 
          },
          (error) => {
            console.error('Error toggling account', error);
          }
        );
    }
  }
}


deleteAccount(userId: number | undefined) {
  if (userId) {
    this.userService.deleteUserAccount(userId).subscribe({
      next: () => {
        console.log(`User with ID ${userId} deleted successfully`);

        this.router.navigate(['/AdminHome/manage-users']);
      },
      error: (error) => {
        console.error('Error deleting account', error);
      }
    });
  }
}

getDownloadLink(pdfFilePath: string): string {
  const filename = pdfFilePath.substring(pdfFilePath.lastIndexOf('/') + 1);
  
  return `http://localhost:8081/api/v1/user/files/${this.userId}/${filename}`;
}



}
