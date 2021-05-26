import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ContestService } from '../../../lib/service/contest.service';
import { ContestResponse } from '../../../lib/dto/response/ContestResponse';
import { mergeMap } from 'rxjs/operators';
import { SubmissionService } from '../../../lib/service/submission.service';
import { SubmissionRequest } from '../../../lib/dto/request/SubmissionRequest';
import { UserService } from '../../../lib/service/user.service';
import { SubmissionResponse } from '../../../lib/dto/response/SubmissionResponse';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css'],
})
export class ContestComponent implements OnInit {
  submissionCreate: boolean;
  contestInit = false;
  submissionList: Array<SubmissionResponse> = [];
  contest: ContestResponse;

  constructor(
    private route: ActivatedRoute,
    private contestService: ContestService,
    private submissionService: SubmissionService,
    private userService: UserService
  ) {}

  onCreateSubmissionClick(): void {
    this.setSubmissionContest(true);
  }

  closeCreateSubmissionModal = (): void => {
    this.setSubmissionContest(false);
  };

  onCreateContestFormSubmit = (submissionFormData: any): void => {
    const submissionRequest: SubmissionRequest = {
      contentType: submissionFormData.contentType,
      contentUrl: submissionFormData.contentUrl,
      repoUrl: submissionFormData.repoUrl,
      file: submissionFormData.file,
      userUuid: this.userService.userInfo.uuid,
      contestUuid: this.contest.uuid,
    };
    this.submissionService
      .createSubmission(submissionRequest)
      .pipe(
        mergeMap(() => this.contestService.getContestDetails(this.contest.uuid))
      )
      .subscribe((response) => {
        this.submissionList = response.submissionList;
        this.contest = response.contest;
        this.closeCreateSubmissionModal();
      });
  };

  setSubmissionContest(state: boolean): void {
    this.submissionCreate = state;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.contestService
        .getContestDetails(params.uuid)
        .subscribe((response) => {
          this.contestInit = true;
          this.submissionList = response.submissionList;
          this.contest = response.contest;
        });
    });
  }
}
