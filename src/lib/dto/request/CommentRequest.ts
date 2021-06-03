export class CommentRequest {
  submissionUuid: string;
  text: string;
  userUuid: string;
  attachmentList: Array<string>;

  constructor(submissionUuid: string, text: string, userUuid: string, attachmentList: Array<string>) {
    this.submissionUuid = submissionUuid;
    this.text = text;
    this.userUuid = userUuid;
    this.attachmentList = attachmentList;
  }

}
