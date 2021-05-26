import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SubmissionService } from '../../../lib/service/submission.service';
import { SubmissionDetailsResponse } from '../../../lib/dto/response/SubmissionDetailsResponse';
import ImageConstants from '../../../lib/constant/image.constant';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css'],
})
export class SubmissionComponent implements OnInit {
  submissionInit: boolean;
  submissionDetails: SubmissionDetailsResponse;

  get imageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.submissionService
        .getSubmissionDetails(params.uuid)
        .subscribe((response) => {
          this.submissionInit = true;
          this.submissionDetails = response;
        });
    });
  }
}
