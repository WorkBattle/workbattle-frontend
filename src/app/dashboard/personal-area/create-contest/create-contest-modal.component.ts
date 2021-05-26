import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../lib/service/user.service';
import { ContestRequest } from '../../../../lib/dto/request/ContestRequest';

@Component({
  selector: 'app-create-contest',
  templateUrl: './create-contest-modal.component.html',
  styleUrls: ['./create-contest-modal.component.css'],
})
export class CreateContestModalComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() handleOk;
  @Input() handleCancel;
  contestForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.contestForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      taskDescription: [null, [Validators.required]],
      closed: [false, [Validators.required]],
      contestStartStop: [null, [Validators.required]],
      contestType: [null, [Validators.required]],
    });
  }

  onFormSubmit(): void {
    for (const i in this.contestForm.controls) {
      if (this.contestForm.controls.hasOwnProperty(i)) {
        this.contestForm.controls[i].markAsDirty();
        this.contestForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.contestForm.valid) {
      const formData = this.contestForm.value;
      this.handleOk(
        new ContestRequest(
          formData.title,
          formData.description,
          formData.taskDescription,
          formData.contestStartStop,
          formData.closed,
          this.userService.userInfo.uuid,
          formData.contestType
        )
      );
    }
  }

  ngOnInit(): void {}
}
