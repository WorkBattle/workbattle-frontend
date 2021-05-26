import { Component, OnInit } from '@angular/core';
import { ContestService } from '../../../lib/service/contest.service';
import { ContestResponse } from '../../../lib/dto/response/ContestResponse';
import { ContestRequest } from '../../../lib/dto/request/ContestRequest';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css'],
})
export class PersonalAreaComponent implements OnInit {
  createContest: boolean;
  contestList: Array<ContestResponse> = [];
  contestListInit = false;

  constructor(private contestService: ContestService) {}

  onCreateContestClick(): void {
    this.setCreateContest(true);
  }

  closeCreateContestModal = (): void => {
    this.setCreateContest(false);
  };

  onCreateContestFormSubmit = (contestRequest: ContestRequest): void => {
    this.contestService
      .createContest(contestRequest)
      .pipe(mergeMap(() => this.contestService.getContestList()))
      .subscribe((response) => {
        this.contestList = response.contestList;
        this.closeCreateContestModal();
      });
  };

  setCreateContest(state: boolean): void {
    this.createContest = state;
  }

  ngOnInit(): void {
    this.contestService.getContestList().subscribe((response) => {
      this.contestList = response.contestList;
      this.contestListInit = true;
    });
  }
}
