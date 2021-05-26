import {ContestTypeResponse} from './ContestTypeResponse';

export class ContestResponse {
  uuid: string;
  title: string;
  description: string;
  taskDescription: string;
  closed: boolean;
  authorUuid: string;
  contestStart: string;
  contestStop: string;
  contestType: ContestTypeResponse;
}
