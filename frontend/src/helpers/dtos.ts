export class UserDto {
  constructor(public userId: string, public username: string) {}
}

export class UserWithPlacesDto extends UserDto {
  places: string[];
  constructor(userId: string, username: string, places: string[]) {
    super(userId, username);
    this.places = places;
  }
}

export class PlaceDto {
  constructor(
    public title: string,
    public description: string,
    public address: string,
    public pictureId: string,
    public readonly placeId: string,
    public readonly creator: string,
    public pictureUrl: string
  ) {}
}

export interface UserLoginInformation {
  email: string;
  password: string;
}

export interface UserSignupInformation {
  username: string;
  email: string;
  password: string;
}

export interface NewPlace {
  title: string;
  description: string;
  address: string;
  picture: Base64<"jpeg">;
}

export interface placeInfoCard {
  title: string;
  description: string;
  address: string;
}

export interface PlaceInfoCardWithPictire extends placeInfoCard {
  picture: File;
}

export type Base64<imageType extends string> =
  `data:image/${imageType};base64${string}`;

export type UserInfoType = {
  userId: string;
  username: string;
};

export class LoginResult {
  public readonly message = "User logged in successfully";
  constructor(public readonly token: string, public readonly user: UserDto) {}
}

export type CommentDto = {
  id: string;
  parentId: string | undefined;
  text: string;
  date: string;
  postID: string;
  writer: CommentWriter;
  likes: { userId: string; commentId: string }[];
  replies: CommentDto[];
};

export type CommentWriter = {
  userId: string;
  username: string;
};

export type NewComment = {
  text: string;
  postID: string;
};

export type CommentLikeDto = {
  userId: string;
  commentId: string;
};

export type CommentReplyDto = {
  parentId: string;
  userId: string;
  postId: string;
  text: string;
};

export enum CommentAction {
  LikeComment,
  UnlikeComment,
  ReplyComment,
  WriteComment,
}

export type NotificationDto = {
  from: {
    userId: string;
    username: string;
  };
  commentContent: {
    placeId: string;
    commentId: string;
    action: CommentAction;
  };
};
