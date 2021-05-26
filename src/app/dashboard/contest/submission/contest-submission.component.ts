import { Component, Input, OnInit } from '@angular/core';
import { ContentTypeResponse } from '../../../../lib/dto/response/ContentTypeResponse';
import ImageConstants from '../../../../lib/constant/image.constant';
import { SubmissionResponse } from '../../../../lib/dto/response/SubmissionResponse';

@Component({
  selector: 'app-contest-submission',
  templateUrl: './contest-submission.component.html',
  styleUrls: ['./contest-submission.component.css'],
})
export class ContestSubmissionComponent implements OnInit {
  @Input() submission: SubmissionResponse;
  get contentType(): typeof ContentTypeResponse {
    return ContentTypeResponse;
  }
  get imageConstants(): typeof ImageConstants {
    return ImageConstants;
  }
  constructor() {}

  ngOnInit(): void {}
}
