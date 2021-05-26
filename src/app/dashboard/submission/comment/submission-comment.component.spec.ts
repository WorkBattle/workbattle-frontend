import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionCommentComponent } from './submission-comment.component';
import { MockConstant } from '../../../../lib/constant/mock.constant';

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
    component.comment = MockConstant.commentsList[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
