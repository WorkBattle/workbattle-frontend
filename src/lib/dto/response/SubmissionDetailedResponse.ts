import { UserResponse } from './UserResponse';
import { ContentTypeResponse } from './ContentTypeResponse';

export class SubmissionDetailedResponse {
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
