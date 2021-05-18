import { Component, OnDestroy, OnInit } from '@angular/core';
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
  backendError: string
  usersSubscription: Subscription

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data as User[]
      console.log(this.users)
    }, error => {
      this.backendError = error
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
    
    this.userService.addRole(user.id, this.addBasedOnRole(user)).subscribe(data => {
      this.user = data
    }, error => {
      this.backendError = error
    })
  }

  addBasedOnRole(user: User): string | null {
    const roles = Array.from(user.roles)
    if(roles.filter(role => role.role === 'ROLE_USER') && !roles.filter(role => role.role === 'ROLE_EDITOR') && !roles.filter(role => role.role === 'ROLE_ADMIN')) {
      return 'EDITOR'
    } else if(roles.filter(role => role.role === 'ROLE_EDITOR') ) {
      return 'ADMIN'
    } else {
      return null
    }
  }
}
