import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';

@Injectable()
export class AuthService {
  apiUrl: string;
  loggedIn: boolean;

  constructor(private httpClient: HttpClient,
              private config: ConfigurationService) {
    this.apiUrl = `${this.config.getApiEndpoint()}`;
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  }

  setSession(status: boolean): void {
    this.loggedIn = status;
    localStorage.setItem('loggedIn', String(status));
  }

  clearSession(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }
}
