import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../lib/service/user.service';

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

  constructor(private fb: FormBuilder) {
    this.submissionForm = this.fb.group({
      contentType: ['url', [Validators.required]],
      repoUrl: [null, [Validators.required]],
      contentUrl: [null],
      file: [null],
    });
  }

  onFormSubmit(): void {
    for (const i in this.submissionForm.controls) {
      if (this.submissionForm.controls.hasOwnProperty(i)) {
        this.submissionForm.controls[i].markAsDirty();
        this.submissionForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.submissionForm.valid) {
      this.handleOk(this.submissionForm.value);
    }
  }

  ngOnInit(): void {}
}
