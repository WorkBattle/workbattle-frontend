import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentTypeResponse } from '../../../../lib/dto/response/ContentTypeResponse';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import ConstraintConstants from '../../../../lib/constant/constraint.constant';

@Component({
  selector: 'app-create-submission',
  templateUrl: './create-submission.component.html',
  styleUrls: ['./create-submission.component.css'],
})
export class CreateSubmissionComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() handleOk;
  @Input() handleCancel;
  submissionForm!: FormGroup;
  chosenContentType: ContentTypeResponse = ContentTypeResponse.URL;
  fileList: Array<NzUploadFile> = [];
  submissionError = false;

  constructor(private fb: FormBuilder) {
    this.submissionForm = this.fb.group({
      contentType: [this.chosenContentType, [Validators.required]],
      repoUrl: [null],
      contentUrl: [null],
      file: [null],
    });
  }

  get contentTypeEnum(): typeof ContentTypeResponse {
    return ContentTypeResponse;
  }

  onContentTypeChoose(contentType: ContentTypeResponse): void {
    this.chosenContentType = contentType;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  onFormSubmit(): void {
    for (const i in this.submissionForm.controls) {
      if (this.submissionForm.controls.hasOwnProperty(i)) {
        this.submissionForm.controls[i].markAsDirty();
        this.submissionForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.submissionForm.valid) {
      if (
        this.submissionForm.controls.contentUrl.value ||
        this.fileListIsValid()
      ) {
        this.handleOk(this.submissionForm.value, this.fileList);
        this.submissionError = false;
      } else {
        this.submissionError = true;
      }
    }
  }

  fileListIsValid(): boolean {
    let filesSize = 0;
    this.fileList.forEach((file) => {
      filesSize += file.size;
    });
    return (
      this.fileList.length > 0 &&
      filesSize <= ConstraintConstants.UPLOAD_CONSTRAINT
    );
  }

  ngOnInit(): void {}
}
