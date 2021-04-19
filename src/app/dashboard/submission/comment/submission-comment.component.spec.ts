import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionCommentComponent } from './submission-comment.component';

describe('CommentComponent', () => {
  let component: SubmissionCommentComponent;
  let fixture: ComponentFixture<SubmissionCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmissionCommentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
