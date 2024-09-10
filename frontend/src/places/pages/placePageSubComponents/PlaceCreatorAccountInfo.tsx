import { FC } from "react";
import { UserDto } from "../../../helpers/dtos";
import Avatar from "../../../shared-UI/Avatar";

type PlaceCreatorAccountInfoT = {
  userDto: UserDto;
  alt: string;
};

const PlaceCreatorAccountInfo: FC<PlaceCreatorAccountInfoT> = ({
  userDto,
  alt,
}) => {
  const { username, pictureUrl: userPictureUrl, placeCount, userId } = userDto;

  return (
    <div className="flex flex-row items-center justify-center text-gray-fav">
      <div>
        <Avatar pictureUrl={userPictureUrl} alt={alt} width={"4rem"} />
      </div>

      <div>
        <p className="py-none px-2 text-sm">{username}</p>
        <p className="py-none px-2 text-sm">
          {placeCount} {placeCount === 1 ? "Place" : "Places"}
        </p>
      </div>
    </div>
  );
};

export default PlaceCreatorAccountInfo;
