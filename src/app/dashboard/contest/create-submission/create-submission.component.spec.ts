import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubmissionComponent } from './create-submission.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';

describe('CreateSubmissionComponent', () => {
  let component: CreateSubmissionComponent;
  let fixture: ComponentFixture<CreateSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder],
      declarations: [CreateSubmissionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
