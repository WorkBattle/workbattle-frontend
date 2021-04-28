import { Component, Input, OnInit } from '@angular/core';
import { ContestResponse } from '../../../../lib/dto/response/ContestResponse';
import * as moment from 'moment';

@Component({
  selector: 'app-personal-area-contest',
  templateUrl: './personal-area-contest.component.html',
  styleUrls: ['./personal-area-contest.component.css'],
})
export class PersonalAreaContestComponent implements OnInit {
  @Input() contest: ContestResponse;
  formattedStartTime: string;
  formattedEndTime: string;
  constructor() {}

  ngOnInit(): void {
    this.formattedStartTime = moment(this.contest.contestStart).format(
      'MMMM Do YYYY'
    );
    this.formattedEndTime = moment(this.contest.contestStop).format(
      'MMMM Do YYYY'
    );
  }
}
