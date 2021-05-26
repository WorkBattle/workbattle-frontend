import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './configuration.service';
import { Observable } from 'rxjs';
import { UserInfoResponse } from '../dto/response/UserInfoResponse';
import { UserResponse } from '../dto/response/UserResponse';

@Injectable()
export class UserService {
  apiUrl: string;
  userInfo: UserResponse;
  constructor(
    private httpClient: HttpClient,
    private config: ConfigurationService
  ) {
    this.apiUrl = 'user';
  }

  getUserInfo(): Observable<UserInfoResponse> {
    return this.httpClient.get<UserInfoResponse>(
      `${this.config.getApiEndpoint()}/${this.apiUrl}/getInfo`
    );
  }
}
