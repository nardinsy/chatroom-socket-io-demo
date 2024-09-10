import { FC, createContext } from "react";
import { BackendService } from "../api/backend-service";
import { HasChildren } from "../helpers/props";
import {
  CommentDto,
  CommentLikeDto,
  CommentReplyDto,
  LoginResult,
  NewComment,
  NewPlace,
  NotificationDto,
  PlaceDto,
  UserLoginInformation,
  UserSignupInformation,
} from "../helpers/dtos";
import { ENDPOINTS } from "../helpers/api-url";
import sendHttpRequest, { MyRequestOptions } from "../helpers/http-request";

class BackedServiceImpl implements BackendService {
  async signup(userInfo: UserSignupInformation): Promise<LoginResult> {
    const requestOptions: MyRequestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };

    return await sendHttpRequest(ENDPOINTS.signup, requestOptions);
  }

  async login(userInfo: UserLoginInformation): Promise<LoginResult> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };

    return await sendHttpRequest(ENDPOINTS.login, requestOptions);
  }

  async addPlace(place: NewPlace, token: string): Promise<{ place: PlaceDto }> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify(place),
    };

    return await sendHttpRequest(ENDPOINTS.addPlace, requestOptions);
  }

  // Comment

  async addComment(
    newComment: NewComment,
    commentActionTo: string,
    token: string
  ): Promise<{ comment: CommentDto }> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ newComment, commentActionTo }),
    };

    return await sendHttpRequest(ENDPOINTS.addComment, requestOptions);
  }

  async likeComment(
    newCommentLike: CommentLikeDto,
    commentActionTo: string,
    token: string
  ): Promise<{ commentLikeDto: CommentLikeDto }> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ newCommentLike, commentActionTo }),
    };

    return await sendHttpRequest(ENDPOINTS.likeComment, requestOptions);
  }

  async replyComment(
    commentReply: CommentReplyDto,
    commentActionTo: string,
    token: string
  ): Promise<{ replyComment: CommentDto }> {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", token },
      body: JSON.stringify({ commentReply, commentActionTo }),
    };

    return await sendHttpRequest(ENDPOINTS.replyComment, requestOptions);
  }

  async getCurrentNotifications(
    token: string
  ): Promise<{ currentNotifications: NotificationDto[] }> {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token },
    };

    return await sendHttpRequest(
      ENDPOINTS.getCurrentNotifications,
      requestOptions
    );
  }

  async getNewNotifications(token: string): Promise<NotificationDto[]> {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token },
    };

    return await sendHttpRequest(ENDPOINTS.getNewNotifications, requestOptions);
  }

  async mergeAndResetNotifications(token: string): Promise<void> {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", token },
    };

    return await sendHttpRequest(
      ENDPOINTS.mergeAndResetNotifications,
      requestOptions
    );
  }
}

const BackendContext = createContext<BackendService | undefined>(undefined);

export const BackendContextProvider: FC<HasChildren> = ({ children }) => {
  const service = new BackedServiceImpl();
  return (
    <BackendContext.Provider value={service}>
      {children}
    </BackendContext.Provider>
  );
};

export default BackendContext;
