import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit, OnDestroy {

  isAccountConfirmed: boolean = false
  confirmedUser: User
  confirmAccountToken: string
  error: string
  private paramsSubscription: Subscription

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
      this.confirmAccountToken = params['token'] as string
    })

    this.userService.confirmAccount(this.confirmAccountToken).subscribe(user => {
      this.confirmedUser = user as User
      console.log(this.confirmedUser.enabled + ' ' + this.confirmedUser.email + ' ' + this.confirmedUser.id)
      this.isAccountConfirmed = this.confirmedUser.enabled
    }, error => {
      this.error = error
    })

  }

  ngOnDestroy(): void {
    if(this.paramsSubscription) {
      this.paramsSubscription.unsubscribe
    }
  }

}
