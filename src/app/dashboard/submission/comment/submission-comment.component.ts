import { Component, Input, OnInit } from '@angular/core';
import { CommentResponse } from '../../../../lib/dto/response/CommentResponse';
import ImageConstants from '../../../../lib/constant/image.constant';

@Component({
  selector: 'app-submission-comment',
  templateUrl: './submission-comment.component.html',
  styleUrls: ['./submission-comment.component.css'],
})
export class SubmissionCommentComponent implements OnInit {
  @Input() comment: CommentResponse;

  get imageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  constructor() {}

  ngOnInit(): void {}
}
