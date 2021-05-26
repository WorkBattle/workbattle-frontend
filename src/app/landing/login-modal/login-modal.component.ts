import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import RegexConstants from '../../../lib/constant/regex.constant';
import { LandingModalState } from '../../../lib/dto/app/LandingModalState';
import { EmailLoginRequest } from '../../../lib/dto/request/EmailLoginRequest';
import { UsernameLoginRequest } from '../../../lib/dto/request/UsernameLoginRequest';

export function LoginValidator(control: AbstractControl): any {
  if (control.value) {
    if (control.value.includes('@')) {
      return Validators.email(control) ? { invalidLogin: true } : null;
    }
    return null;
  }
  return { invalidLogin: true };
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  @Input() isVisible: boolean;
  @Input() handleOk;
  @Input() handleCancel;
  @Input() setModalState;
  loginForm!: FormGroup;

  get landingModalState(): typeof LandingModalState {
    return LandingModalState;
  }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userName: [
        null,
        [
          Validators.required,
          LoginValidator,
          Validators.pattern(RegexConstants.USERNAME),
        ],
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
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      if (formData.userName.includes('@')) {
        this.handleOk(new EmailLoginRequest(formData.email, formData.password));
      } else {
        this.handleOk(
          new UsernameLoginRequest(formData.userName, formData.password)
        );
      }
    }
  }

  ngOnInit(): void {}
}
