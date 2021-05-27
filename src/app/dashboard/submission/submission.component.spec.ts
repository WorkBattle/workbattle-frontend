import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmissionComponent } from './submission.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SubmissionService } from '../../../lib/service/submission.service';
import { ActivatedRoute } from '@angular/router';
import { MockConstant } from '../../../lib/constant/mock.constant';
import { of } from 'rxjs';
import ImageConstants from '../../../lib/constant/image.constant';

describe('SubmissionComponent', () => {
  let component: SubmissionComponent;
  let fixture: ComponentFixture<SubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: SubmissionService,
          useValue: {
            getSubmissionDetails: () =>
              of({
                submission: MockConstant.submissionList[0],
                commentsList: MockConstant.commentsList,
              }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: MockConstant.submissionList[0].uuid }),
          },
        },
      ],
      declarations: [SubmissionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should write that there`s no comments if there aren`t any', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('#no-comments')
    ).toBeNull();
    component.submissionDetails.commentsList = [];
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('#no-comments')
    ).toBeDefined();
  });

  it('should calculate likes progress properly', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('#likes-progress').style
        .width
    ).toBe('60%');
    component.submissionDetails.submission.likes = 0;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('#likes-progress').style
        .width
    ).toBe('0%');
    component.submissionDetails.submission.dislikes = 0;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('#likes-progress').style
        .width
    ).toBe('0%');
  });

  it('should show default avatar if submission author doesn`t have one', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('#author-avatar').src
    ).toBe(MockConstant.user.avatar);
    component.submissionDetails.submission.user.avatar = null;
    fixture.detectChanges();
    expect(
      new URL(
        fixture.debugElement.nativeElement.querySelector('#author-avatar').src
      ).pathname.slice(1)
    ).toBe(ImageConstants.DEFAULT_AVATAR);
  });
});
