import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAreaContestComponent } from './personal-area-contest.component';
import { MockConstant } from '../../../../lib/constant/mock.constant';

describe('ContestComponent', () => {
  let component: PersonalAreaContestComponent;
  let fixture: ComponentFixture<PersonalAreaContestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalAreaContestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalAreaContestComponent);
    fixture.componentInstance.contest = MockConstant.contestList[0];
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
