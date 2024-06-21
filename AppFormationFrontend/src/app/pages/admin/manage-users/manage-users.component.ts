import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/models';
import { UserService } from 'src/app/services/services';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: User[]=[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.findAllUsers();
    
  }

  findAllUsers() {
    this.users = []
    this.userService.findAll()
      .subscribe({
        next: (users) => {
          this.users = users;
          console.log(this.users); 
          console.log(typeof this.users); 
        },
        error: (err) => {
          console.error('Error fetching users', err);
        }
      });
  }

  toggleAccount(userId: number | undefined) {
    if(userId) {
    const userToUpdate = this.users.find(user => user.userId === userId);
    if (userToUpdate) {
      this.userService.toggleUserAccount(userId)
        .subscribe(
          (updatedUser) => {
            
            userToUpdate.accountLocked =  !userToUpdate.accountLocked 
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
        this.users = this.users.filter(user => user.userId !== userId);
        console.log(`User with ID ${userId} deleted successfully`);
      },
      error: (error) => {
        console.error('Error deleting account', error);
      }
    });
  }
}


}
