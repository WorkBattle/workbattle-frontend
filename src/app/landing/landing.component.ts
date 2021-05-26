import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../lib/service/auth.service';
import { Router } from '@angular/router';
import { LandingModalState } from '../../lib/dto/app/LandingModalState';
import { RegisterRequest } from '../../lib/dto/request/RegisterRequest';
import { LoginRequest } from '../../lib/dto/request/LoginRequest';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  currentModal: LandingModalState;

  constructor(private authService: AuthService, private router: Router) {}

  get landingModalState(): typeof LandingModalState {
    return LandingModalState;
  }

  setModalState = (modal: LandingModalState): void => {
    this.currentModal = modal;
  }

  onModalClose = (): void => {
    this.currentModal = LandingModalState.NONE;
  }

  onLoginFormSubmit = (loginFormData: LoginRequest): void => {
    this.authService.login(loginFormData).subscribe((response) => {
      this.authService.setSession(response.token);
      this.router.navigate(['/main']);
    });
  }

  onRegisterFormSubmit = (registerFormData: RegisterRequest): void => {
    this.authService.register(registerFormData).subscribe((response) => {
      this.authService.setSession(response.token);
      this.router.navigate(['/main']);
    });
  }

  ngOnInit(): void {}
}
