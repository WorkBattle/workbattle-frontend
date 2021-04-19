import {UserResponse} from './UserResponse';

export class CommentResponse {
  uuid: string;
  text: string;
  author: UserResponse;
}
