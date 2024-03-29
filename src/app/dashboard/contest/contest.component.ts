import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContestService } from '../../../lib/service/contest.service';
import { ContestResponse } from '../../../lib/dto/response/ContestResponse';
import { catchError, mergeMap } from 'rxjs/operators';
import { SubmissionService } from '../../../lib/service/submission.service';
import { SubmissionRequest } from '../../../lib/dto/request/SubmissionRequest';
import { UserService } from '../../../lib/service/user.service';
import { SubmissionResponse } from '../../../lib/dto/response/SubmissionResponse';
import { EMPTY } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import FileUtil from '../../../lib/util/file.util';

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
  canMakeSubmission: boolean;
  isContestOutdated: boolean;

  constructor(
    private route: ActivatedRoute,
    private contestService: ContestService,
    private submissionService: SubmissionService,
    private userService: UserService,
    private router: Router
  ) {}

  onCreateSubmissionClick(): void {
    this.setSubmissionContest(true);
  }

  closeCreateSubmissionModal = (): void => {
    this.setSubmissionContest(false);
  };

  onCreateContestFormSubmit = async (
    submissionFormData: any,
    fileList: Array<NzUploadFile>
  ): Promise<void> => {
    const submissionRequest: SubmissionRequest = {
      contentType: submissionFormData.contentType,
      contentUrl: submissionFormData.contentUrl,
      repoUrl: submissionFormData.repoUrl,
      file: await FileUtil.toBase64(fileList[0]),
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
    this.canMakeSubmission = false;
    this.route.params.subscribe((params: Params) => {
      this.contestService
        .getContestDetails(params.uuid)
        .pipe(
          catchError(() => {
            this.router.navigate(['/main/notfound']);
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.contestInit = true;
          this.submissionList = response.submissionList;
          this.contest = response.contest;
          this.isContestOutdated =
            new Date() > new Date(response.contest.contestStop);
          this.canMakeSubmission =
            this.userService.userInfo.uuid !== response.contest.authorUuid &&
            !this.isContestOutdated;
        });
    });
  }
}
