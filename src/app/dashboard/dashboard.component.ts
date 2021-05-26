import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../lib/service/user.service';
import { UserResponse } from '../../lib/dto/response/UserResponse';
import ImageConstants from '../../lib/constant/image.constant';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userInfo: UserResponse;

  get imageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.clearSession();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.userService
      .getUserInfo()
      .pipe(
        catchError((err) => {
          this.logout();
          if (err instanceof HttpErrorResponse && err.status === 403) {
            return EMPTY;
          }
        })
      )
      .subscribe((response) => {
        this.userService.userInfo = response.user;
        this.userInfo = response.user;
      });
  }
}
