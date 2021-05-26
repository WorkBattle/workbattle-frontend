import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs';
import { TokenResponse } from '../dto/response/TokenResponse';
import { LoginRequest } from '../dto/request/LoginRequest';
import { RegisterRequest } from '../dto/request/RegisterRequest';

@Injectable()
export class AuthService {
  apiUrl: string;

  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationService
  ) {
    this.apiUrl = 'auth';
  }

  login(loginRequest: LoginRequest): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(
      `${this.config.getApiEndpoint()}/${this.apiUrl}/login`,
      loginRequest
    );
  }

  register(registerRequest: RegisterRequest): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(
      `${this.config.getApiEndpoint()}/${this.apiUrl}/register`,
      registerRequest
    );
  }

  setSession(token: string): void {
    localStorage.setItem('token', token);
  }

  clearSession(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
