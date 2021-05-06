import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})
export class LoggedInComponent implements OnInit, OnDestroy {

  users: User[];
  backendError: string
  usersSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data as User[]
      console.log(this.users)
    }, error => {
      this.backendError = error
    })
  }

  ngOnDestroy(): void {
    if(this.usersSubscription) {
      this.usersSubscription.unsubscribe;
    }
  }

}
