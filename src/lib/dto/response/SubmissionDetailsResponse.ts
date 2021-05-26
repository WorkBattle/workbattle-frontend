import { CommentResponse } from './CommentResponse';
import { SubmissionDetailedResponse } from './SubmissionDetailedResponse';

export class SubmissionDetailsResponse {
  submission: SubmissionDetailedResponse;
  commentsList: Array<CommentResponse>;
}
