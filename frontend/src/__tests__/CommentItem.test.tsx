import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthContext from "../contexts/auth-context";
import { BrowserRouter } from "react-router-dom";
import {
  authProviderValueLoggedinProps,
  commentProviderValueProps,
} from "../testHelpers/test-helper";
import CommentContext from "../contexts/comment-contex";
import EditableCommentItem from "../places/comment/EditableCommentItem";
const DUMMY_COMMENTDTO = {
  id: "66953066398f8bc122208ddf",
  text: "Hoob moodideshoon?",
  date: "2024-07-15T13:34:11.686Z",
  postID: "663f525d35a71729209490d4",
  writer: {
    pictureUrl: undefined,
    userId: "66923931226ca70e0528d3c0",
    username: "test",
    placeCount: 1,
  },
  likes: [
    {
      userId: "66923931226ca70e0528d3c0",
      commentId: "66953066398f8bc122208ddf",
    },
  ],
  replies: [],
  parentId: undefined,
};

const renderEditableCommentItem = () => {
  const authProviderValue = authProviderValueLoggedinProps;
  const commentProviderValue = commentProviderValueProps;

  const { baseElement } = render(
    <BrowserRouter>
      <AuthContext.Provider value={authProviderValue}>
        <CommentContext.Provider value={commentProviderValue}>
          <EditableCommentItem commentDto={DUMMY_COMMENTDTO} />
        </CommentContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );

  return { baseElement, ...authProviderValue, ...commentProviderValue };
};

describe("Editable comment item", () => {
  test("delte comment when press delete button", () => {
    const { comments, deleteComment } = renderEditableCommentItem();
  });

  test("edit comment when press edit button", () => {});
});
