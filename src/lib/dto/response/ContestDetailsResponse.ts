import {ContestResponse} from './ContestResponse';
import {SubmissionResponse} from './SubmissionResponse';

export class ContestDetailsResponse {
  contest: ContestResponse;
  submissionList: Array<SubmissionResponse>;
}
