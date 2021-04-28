import { Component, OnInit } from '@angular/core';
import { ContestService } from '../../../lib/service/contest.service';
import { ContestResponse } from '../../../lib/dto/response/ContestResponse';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css'],
})
export class PersonalAreaComponent implements OnInit {
  contestList: Array<ContestResponse> = [];
  constructor(private contestService: ContestService) {}

  ngOnInit(): void {
    this.contestService.getContestList().subscribe((response) => {
      this.contestList = response.contestList;
    });
  }
}
