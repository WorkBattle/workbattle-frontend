import {UserResponse} from '../dto/response/UserResponse';
import {ContestResponse} from '../dto/response/ContestResponse';
import {SubmissionDetailsResponse} from '../dto/response/SubmissionDetailsResponse';
import {CommentResponse} from '../dto/response/CommentResponse';
import {AttachmentResponse} from '../dto/response/AttachmentResponse';
import {TransactionResponse} from '../dto/response/TransactionResponse';
import {ContestTypeResponse} from '../dto/response/ContestTypeResponse';
import {ContentTypeResponse} from '../dto/response/ContentTypeResponse';
import {SubmissionResponse} from '../dto/response/SubmissionResponse';
import {SubmissionDetailedResponse} from '../dto/response/SubmissionDetailedResponse';

export class MockConstant {
  static user: UserResponse = {
    uuid: 'f5918dab-0fcf-467a-b48d-3dcdb17ac72b',
    username: 'ArthCode',
    email: 'leon@brawl.stars',
    firstname: 'Arthur',
    lastname: 'Ladchenko',
    balance: 2500,
    avatar: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bmV0aGVybGFuZHN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
  };
  static contestList: Array<ContestResponse> = [{
    uuid: '3eccb73e-0dc5-4208-90d9-5d2850955a4c',
    title: 'Лучший конкурс на логотип 2021',
    description: 'Нарисуй лучший логотип в 2021',
    taskDescription: 'Нужно сделать лого для заправки WOG в зелёных цветах',
    closed: false,
    authorUuid: MockConstant.user.uuid,
    contestStart: '2020-05-02T10:20:30',
    contestStop: '2021-05-02T10:20:30',
    contestType: ContestTypeResponse.DESIGN
  }];
  static attachmentList: Array<AttachmentResponse> = [{
    uuid: '5ced4217-8773-4e66-b96d-cba14207641d',
    url: 'https://assets.bonappetit.com/photos/5c62e4a3e81bbf522a9579ce/5:4/w_2815,h_2252,c_limit/milk-bread.jpg'
  }];
  static submissionList: Array<SubmissionDetailedResponse> = [{
    uuid: '3266505c-3551-4ef2-bcd1-8ec2148eb610',
    contentType: ContentTypeResponse.URL,
    likes: 6,
    contentUrl: 'https://arthco.de',
    fileUrl: null,
    user: MockConstant.user,
    repoUrl: 'https://arthco.de',
    dislikes: 4,
    liked: false
  }];
  static commentsList: Array<CommentResponse> = [{
    uuid: '64dff07c-c70c-41a9-9ed2-a242bd0101c4',
    text: 'Hello! How are you?',
    user: MockConstant.user,
    attachments: MockConstant.attachmentList
  }];
  static transactionList: Array<TransactionResponse> = [{
    uuid: 'f21b8673-2f01-4fec-9811-bf4e41a9c579',
    date: '2020-05-02T10:20:30',
    info: 'Пополнение баланса +2500'
  }];
}
