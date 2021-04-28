import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';
import {Observable} from 'rxjs';
import {ContestResponse} from '../dto/response/ContestResponse';

@Injectable()
export class ContestService {
  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private config: ConfigurationService) {
    this.apiUrl = `${this.config.getApiEndpoint()}/contests`;
  }

  getContestList(): Observable<Array<ContestResponse>> {
    return this.httpClient.get<Array<ContestResponse>>(this.apiUrl);
  }
}
