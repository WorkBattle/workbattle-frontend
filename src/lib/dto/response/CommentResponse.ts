import {UserResponse} from './UserResponse';
import {AttachmentResponse} from './AttachmentResponse';

export class CommentResponse {
  uuid: string;
  text: string;
  user: UserResponse;
  attachments: Array<AttachmentResponse>;
}
