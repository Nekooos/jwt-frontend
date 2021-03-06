import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Role } from '../model/Role';
import { User } from '../model/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})
export class LoggedInComponent implements OnInit, OnDestroy {
  userRoles: string[]
  users: User[]
  user: User
  role: Role
  error: string
  usersSubscription: Subscription

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('username'))
    console.log(sessionStorage.getItem('role'))
    console.log(sessionStorage.getItem('jwtToken'))
    this.userService.getAllUsers().subscribe(data => {
      this.users = data as User[]
    }, error => {
      this.error = error
    })

    let userRoles: string = sessionStorage.getItem('role')
    this.userRoles = userRoles.split(',')
    console.log(this.userRoles)
  }

  ngOnDestroy(): void {
    if(this.usersSubscription) {
      this.usersSubscription.unsubscribe;
    }
  }

  addRole(user: User): void {
    console.log(user)
    const roleToAdd: string = this.addBasedOnRole(user)
    this.userService.addRole(user.id, roleToAdd).subscribe(data => {
      this.user = data as User
    }, error => {
      this.error = error
    })
  }

  addBasedOnRole(user: User): string {
    const roles = Array.from(user.roles)
   
    if(roles.find(role => role.role !== 'EDITOR')) {
      return 'EDITOR'
    } 
    else {
      return 'ADMIN'
    }
  }
}
