import { ContestTypeResponse } from '../response/ContestTypeResponse';

export class ContestRequest {
  title: string;
  description: string;
  taskDescription: string;
  closed: boolean;
  contestStart: string;
  contestStop: string;
  contestType: ContestTypeResponse;
  authorUuid: string;

  constructor(
    title: string,
    description: string,
    taskDescription: string,
    contestStartStop: Array<Date>,
    closed: boolean,
    authorUuid: string,
    contestType: ContestTypeResponse
  ) {
    this.title = title;
    this.description = description;
    this.taskDescription = taskDescription;
    this.contestStart = contestStartStop[0].toISOString();
    this.contestStop = contestStartStop[1].toISOString();
    this.closed = closed;
    this.authorUuid = authorUuid;
    this.contestType = contestType;
  }
}
