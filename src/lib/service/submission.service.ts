import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';
import {Observable} from 'rxjs';
import {SubmissionDetailsResponse} from '../dto/response/SubmissionDetailsResponse';
import {SubmissionRequest} from '../dto/request/SubmissionRequest';
import {CommentResponse} from '../dto/response/CommentResponse';
import {CommentRequest} from '../dto/request/CommentRequest';

@Injectable()
export class SubmissionService {
  apiUrl: string;

  constructor(private httpClient: HttpClient,
              private config: ConfigurationService) {
    this.apiUrl = `submission`;
  }

  getSubmissionDetails(contestUuid: string): Observable<SubmissionDetailsResponse> {
    return this.httpClient.get<SubmissionDetailsResponse>(`${this.config.getApiEndpoint()}/${this.apiUrl}/${contestUuid}`);
  }

  createSubmission(submissionRequest: SubmissionRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.config.getApiEndpoint()}/${this.apiUrl}`, submissionRequest);
  }

  postComment(request: CommentRequest): Observable<CommentResponse> {
    return this.httpClient.post<CommentResponse>(`${this.config.getApiEndpoint()}/comment`, request);
  }

  putLike(request: any, submissionUuid: string): Observable<any> {
    return this.httpClient.post<any>(`${this.config.getApiEndpoint()}/${this.apiUrl}/${submissionUuid}/likes`, request);
  }

  putDislike(request: any, submissionUuid: string): Observable<any> {
    return this.httpClient.post<any>(`${this.config.getApiEndpoint()}/${this.apiUrl}/${submissionUuid}/dislikes`, request);
  }
}
