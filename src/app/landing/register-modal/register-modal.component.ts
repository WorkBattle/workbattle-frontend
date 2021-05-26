import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingModalState } from '../../../lib/dto/app/LandingModalState';
import RegexConstants from '../../../lib/constant/regex.constant';
import { RegisterRequest } from '../../../lib/dto/request/RegisterRequest';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css'],
})
export class RegisterModalComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() handleOk;
  @Input() handleCancel;
  @Input() setModalState;
  registerForm!: FormGroup;

  get landingModalState(): typeof LandingModalState {
    return LandingModalState;
  }

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      userName: [
        null,
        [Validators.required, Validators.pattern(RegexConstants.USERNAME)],
      ],
      password: [
        null,
        [Validators.required, Validators.pattern(RegexConstants.PASSWORD)],
      ],
    });
  }

  onModalRedirect(modal: LandingModalState): void {
    this.setModalState(modal);
  }

  onFormSubmit(): void {
    for (const i in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(i)) {
        this.registerForm.controls[i].markAsDirty();
        this.registerForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.handleOk(
        new RegisterRequest(
          formData.userName,
          formData.email,
          formData.password
        )
      );
    }
  }

  ngOnInit(): void {}
}
