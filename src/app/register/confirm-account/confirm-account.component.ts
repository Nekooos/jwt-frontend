import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit, OnDestroy {

  token: String
  private routeParamSubscription: Subscription

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.routeParamSubscription = this.activatedRoute.queryParams.subscribe(confirmAccountToken => {
      this.token = confirmAccountToken as String
    }, error => {
      console.log(error)
    },() => {
      //userservice post confirm account
    })
  }

  ngOnDestroy(): void {
    if(this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe
    }
  }

}
