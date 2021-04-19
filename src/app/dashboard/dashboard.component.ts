import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.clearSession();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {}
}
