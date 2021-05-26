import {ContentTypeResponse} from './ContentTypeResponse';
import {UserResponse} from './UserResponse';
import {CommentResponse} from './CommentResponse';

export class SubmissionDetailsResponse {
  submission: SubmissionDetails;
  commentsList: Array<CommentResponse>;
}

class SubmissionDetails {
  uuid: string;
  contentUrl: string | null;
  fileUrl: string | null;
  repoUrl: string;
  user: UserResponse;
  contentType: ContentTypeResponse;
  likes: number;
  dislikes: number;
  liked: boolean;
}
