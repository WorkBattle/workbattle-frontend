import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';
import {Observable} from 'rxjs';
import {ContestListResponse} from '../dto/response/ContestListResponse';
import {ContestDetailsResponse} from '../dto/response/ContestDetailsResponse';
import {ContestRequest} from '../dto/request/ContestRequest';

@Injectable()
export class ContestService {
  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private config: ConfigurationService) {
    this.apiUrl = `contest`;
  }

  getContestList(): Observable<ContestListResponse> {
    return this.httpClient.get<ContestListResponse>(`${this.config.getApiEndpoint()}/contests`);
  }

  getContestDetails(contestUuid: string): Observable<ContestDetailsResponse> {
    return this.httpClient.get<ContestDetailsResponse>(`${this.config.getApiEndpoint()}/${this.apiUrl}/${contestUuid}`);
  }

  createContest(contestRequest: ContestRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.config.getApiEndpoint()}/${this.apiUrl}`, contestRequest);
  }
}
