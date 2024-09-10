import {
  LoginResult,
  UserLoginInformation,
  PlaceDto,
  UserDto,
  placeInfoCard,
  UserSignupInformation,
  NewPlace,
  CommentDto,
  NewComment,
  CommentLikeDto,
  CommentReplyDto,
  NotificationDto,
} from "../helpers/dtos";

export interface BackendService {
  signup(userInfo: UserSignupInformation): Promise<LoginResult>;

  login(userInfo: UserLoginInformation): Promise<LoginResult>;

  addPlace(
    place: NewPlace,
    token: string
  ): Promise<{
    place: PlaceDto;
  }>;

  addComment(
    NewComment: NewComment,
    commentActionTo: string,
    token: string
  ): Promise<{ comment: CommentDto }>;

  likeComment(
    NewCommentLike: CommentLikeDto,
    commentActionTo: string,
    token: string
  ): Promise<{ commentLikeDto: CommentLikeDto }>;

  replyComment(
    commentReply: CommentReplyDto,
    commentActionTo: string,
    token: string
  ): Promise<{ replyComment: CommentDto }>;

  getCurrentNotifications(
    token: string
  ): Promise<{ currentNotifications: NotificationDto[] }>;

  getNewNotifications(token: string): Promise<NotificationDto[]>;

  mergeAndResetNotifications(token: string): Promise<void>;
}
