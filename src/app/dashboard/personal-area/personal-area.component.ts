import { Component, OnInit } from '@angular/core';
import { ContestService } from '../../../lib/service/contest.service';
import { ContestResponse } from '../../../lib/dto/response/ContestResponse';
import { ContestRequest } from '../../../lib/dto/request/ContestRequest';
import { mergeMap } from 'rxjs/operators';
import { ContestTypeResponse } from '../../../lib/dto/response/ContestTypeResponse';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css'],
})
export class PersonalAreaComponent implements OnInit {
  createContest: boolean;
  contestList: Array<ContestResponse> = [];
  contestListInit = false;
  listOfChosenContestTypes: Array<ContestTypeResponse> = [
    ContestTypeResponse.PROGRAMMING,
    ContestTypeResponse.DESIGN,
    ContestTypeResponse.WRITING,
    ContestTypeResponse.VIDEO,
  ];

  constructor(private contestService: ContestService) {}

  get contestTypeEnum(): typeof ContestTypeResponse {
    return ContestTypeResponse;
  }

  onCreateContestClick(): void {
    this.setCreateContest(true);
  }

  closeCreateContestModal = (): void => {
    this.setCreateContest(false);
  };

  filterContestByActuality(
    contestList: Array<ContestResponse>
  ): Array<ContestResponse> {
    return contestList.sort(
      (a, b) =>
        new Date(b.contestStop).getTime() - new Date(a.contestStop).getTime()
    );
  }

  onCreateContestFormSubmit = (contestRequest: ContestRequest): void => {
    this.contestService
      .createContest(contestRequest)
      .pipe(mergeMap(() => this.contestService.getContestList()))
      .subscribe((response) => {
        this.contestList = this.filterContestByActuality(response.contestList);
        this.closeCreateContestModal();
      });
  };

  setCreateContest(state: boolean): void {
    this.createContest = state;
  }

  ngOnInit(): void {
    this.contestService.getContestList().subscribe((response) => {
      this.contestList = this.filterContestByActuality(response.contestList);
      this.contestListInit = true;
    });
  }
}
