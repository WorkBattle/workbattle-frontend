import {ContentTypeResponse} from './ContentTypeResponse';
import {UserResponse} from './UserResponse';

export class SubmissionResponse {
  uuid: string;
  contentType: ContentTypeResponse;
  contentUrl: string | null;
  fileUrl: string | null;
  repoUrl: string | null;
  author: UserResponse;
}
