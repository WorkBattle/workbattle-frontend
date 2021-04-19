import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.setSession(true);
    this.router.navigate(['/main']);
  }

  ngOnInit(): void {}
}
