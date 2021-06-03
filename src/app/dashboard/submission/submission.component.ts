import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SubmissionService } from '../../../lib/service/submission.service';
import { SubmissionDetailsResponse } from '../../../lib/dto/response/SubmissionDetailsResponse';
import ImageConstants from '../../../lib/constant/image.constant';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import FileUtil from '../../../lib/util/file.util';
import { CommentRequest } from '../../../lib/dto/request/CommentRequest';
import { UserService } from '../../../lib/service/user.service';
import ConstraintConstants from '../../../lib/constant/constraint.constant';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css'],
})
export class SubmissionComponent implements OnInit {
  @ViewChild('commentInput') commentInput;
  @ViewChild('noComments') noComments;
  @ViewChild('likesProgress') likesProgress;
  @ViewChild('authorAvatar') authorAvatar;
  submissionInit: boolean;
  submissionDetails: SubmissionDetailsResponse;
  fileList: Array<NzUploadFile> = [];
  isCurrentUserNotSubmissionOwner: boolean;
  canPostComment = true;
  maxSizeExceeded = false;

  get imageConstants(): typeof ImageConstants {
    return ImageConstants;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private submissionService: SubmissionService,
    private userService: UserService
  ) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  async sendComment(comment: string): Promise<void> {
    this.canPostComment = false;
    if (this.getFilesSize() <= ConstraintConstants.UPLOAD_CONSTRAINT) {
      const base64list = [];
      for (const file of this.fileList) {
        base64list.push(await FileUtil.toBase64(file));
      }
      this.submissionService
        .postComment(
          new CommentRequest(
            this.submissionDetails.submission.uuid,
            comment,
            this.userService.userInfo.uuid,
            base64list
          )
        )
        .subscribe((commentResponse) => {
          this.canPostComment = true;
          this.maxSizeExceeded = false;
          this.commentInput.nativeElement.value = '';
          this.fileList = [];
          this.submissionDetails.commentsList.push(commentResponse);
        });
    } else {
      this.maxSizeExceeded = true;
    }
  }

  onPutLike(): void {
    if (this.isCurrentUserNotSubmissionOwner) {
      if (this.submissionDetails.submission.liked) {
        this.submissionService
          .putLike({ delete: true }, this.submissionDetails.submission.uuid)
          .subscribe(() => {
            this.submissionDetails.submission.likes -= 1;
            this.submissionDetails.submission.liked = false;
          });
      } else if (this.submissionDetails.submission.disliked) {
        this.submissionService
          .putLike({}, this.submissionDetails.submission.uuid)
          .subscribe(() => {
            this.submissionDetails.submission.likes += 1;
            this.submissionDetails.submission.dislikes -= 1;
            this.submissionDetails.submission.liked = true;
            this.submissionDetails.submission.disliked = false;
          });
      } else {
        this.submissionService
          .putLike({}, this.submissionDetails.submission.uuid)
          .subscribe(() => {
            this.submissionDetails.submission.likes += 1;
            this.submissionDetails.submission.liked = true;
          });
      }
    }
  }

  onPutDislike(): void {
    if (this.isCurrentUserNotSubmissionOwner) {
      if (this.submissionDetails.submission.liked) {
        this.submissionService
          .putDislike({}, this.submissionDetails.submission.uuid)
          .subscribe(() => {
            this.submissionDetails.submission.likes -= 1;
            this.submissionDetails.submission.dislikes += 1;
            this.submissionDetails.submission.liked = false;
            this.submissionDetails.submission.disliked = true;
          });
      } else if (this.submissionDetails.submission.disliked) {
        this.submissionService
          .putDislike({delete: true}, this.submissionDetails.submission.uuid)
          .subscribe(() => {
            this.submissionDetails.submission.dislikes -= 1;
            this.submissionDetails.submission.disliked = false;
          });
      } else {
        this.submissionService
          .putDislike({}, this.submissionDetails.submission.uuid)
          .subscribe(() => {
            this.submissionDetails.submission.dislikes += 1;
            this.submissionDetails.submission.disliked = true;
          });
      }
    }
  }

  getFilesSize(): number {
    let filesSize = 0;
    this.fileList.forEach((file) => {
      filesSize += file.size;
    });
    return filesSize;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.submissionService
        .getSubmissionDetails(params.uuid)
        .pipe(
          catchError(() => {
            this.router.navigate(['/main/notfound']);
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.submissionInit = true;
          this.isCurrentUserNotSubmissionOwner =
            response.submission.user.uuid !== this.userService.userInfo.uuid;
          this.submissionDetails = response;
        });
    });
  }
}
