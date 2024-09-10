import { FC } from "react";
import PlaceImage from "./placePageSubComponents/PlaceImage";
import PlaceInfo from "./placePageSubComponents/PlaceInfo";
import PlaceCreatorAccountInfo from "./placePageSubComponents/PlaceCreatorAccountInfo";
import FollowButton from "./placePageSubComponents/FollowButton";
import CommentBox from "../comment/CommentBox";
import { CommentContextProvider } from "../../contexts/comment-contex";
import { PlaceDto, UserDto } from "../../helpers/dtos";

interface PlacePageContentT {
  placeDto: PlaceDto;
  userDto: UserDto;
}
const PlacePageContent: FC<PlacePageContentT> = ({ placeDto, userDto }) => {
  const { title, pictureUrl } = placeDto;
  const scrollCommentAreaHandler = (event: any) => {};

  return (
    <div className="flex flex-col mt-16 h-auto w-full overflow-hidden md:flex-row md:w-11/12 md:h-place-page md:mx-auto md:mt-20 md:rounded-4xl md:shadow-default">
      <PlaceImage src={pictureUrl} alt={title} />

      <div className="relative flex flex-col items-center w-full md:w-2/5 md:h-full">
        <div className="flex flex-row items-center justify-around w-full py-4 px-2">
          <PlaceCreatorAccountInfo userDto={userDto} alt={title} />
          <FollowButton />
        </div>

        <div className="w-4/5 p-1 border-t border-gray-fav" />

        <div
          className="w-full h-image-select-card overflow-y-scroll md:h-full"
          onScroll={scrollCommentAreaHandler}
        >
          <PlaceInfo placeDto={placeDto} />

          <CommentContextProvider commentActionTo={userDto.userId}>
            <CommentBox placeId={placeDto.placeId} />
          </CommentContextProvider>
        </div>
      </div>
    </div>
  );
};

export default PlacePageContent;
