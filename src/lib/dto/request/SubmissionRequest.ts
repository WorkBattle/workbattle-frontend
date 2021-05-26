import {ContentTypeResponse} from '../response/ContentTypeResponse';

export class SubmissionRequest {
  contentType: ContentTypeResponse;
  userUuid: string;
  contestUuid: string;
  contentUrl: string | null;
  file: string | null;
  repoUrl: string | null;
}
