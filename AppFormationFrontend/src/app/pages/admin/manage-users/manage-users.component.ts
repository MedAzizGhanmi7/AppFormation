import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/models';
import { UserService } from 'src/app/services/services';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  selectedRole: string = '';
  sortOrder: string = 'recent'; // Default sort order
  accountStatus: string = '';
  roles: string[] = ['ADMIN', 'PARTICIPANT', 'INSTRUCTOR']; 

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.findAllUsers();
  }

  findAllUsers() {
    this.userService.findAll()
      .subscribe({
        next: (users) => {
          this.users = users;
          this.applyFilters();
        },
        error: (err) => {
          console.error('Error fetching users', err);
        }
      });
  }

  toggleAccount(userId: number | undefined) {
    if (userId) {
      const userToUpdate = this.users.find(user => user.userId === userId);
      if (userToUpdate) {
        this.userService.toggleUserAccount(userId)
          .subscribe(
            () => {
              userToUpdate.accountLocked = !userToUpdate.accountLocked;
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
          this.applyFilters();
          console.log(`User with ID ${userId} deleted successfully`);
        },
        error: (error) => {
          console.error('Error deleting account', error);
        }
      });
    }
  }

  searchUsers() {
    this.applyFilters();
  }

  filterUsersByRole() {
    this.applyFilters();
  }

  filterUsersByAccountStatus() {
    this.applyFilters();
  }

  sortUsers() {
    this.applyFilters();
  }

  applyFilters() {
    let tempUsers = [...this.users];

    if (this.selectedRole) {
      tempUsers = tempUsers.filter(user =>
        user.roles?.some(role => role.name === this.selectedRole)
      );
    }

    if (this.searchText) {
      tempUsers = tempUsers.filter(user =>
        user.email?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.cin?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.firstname?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.lastname?.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.accountStatus) {
      tempUsers = tempUsers.filter(user =>
        this.accountStatus === 'locked' ? user.accountLocked : !user.accountLocked
      );
    }

    if (this.sortOrder === 'recent') {
      tempUsers.sort((a, b) => new Date(b.createdDate || 0).getTime() - new Date(a.createdDate || 0).getTime());
    } else if (this.sortOrder === 'old') {
      tempUsers.sort((a, b) => new Date(a.createdDate || 0).getTime() - new Date(b.createdDate || 0).getTime());
    }

    this.filteredUsers = tempUsers;
  }
}
