import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';
import {Observable} from 'rxjs';
import {ContestListResponse} from '../dto/response/ContestListResponse';

@Injectable()
export class ContestService {
  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private config: ConfigurationService) {
    this.apiUrl = `${this.config.getApiEndpoint()}/contests`;
  }

  getContestList(): Observable<ContestListResponse> {
    return this.httpClient.get<ContestListResponse>(this.apiUrl);
  }
}
