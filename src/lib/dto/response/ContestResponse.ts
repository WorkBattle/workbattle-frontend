import {UserResponse} from './UserResponse';
import {ContestTypeResponse} from './ContestTypeResponse';

export class ContestResponse {
  uuid: string;
  title: string;
  description: string;
  taskDescription: string;
  closed: boolean;
  author: UserResponse;
  contestStart: string;
  contestStop: string;
  contestType: ContestTypeResponse;
}
