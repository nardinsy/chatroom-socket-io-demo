import { FC } from "react";
import PlaceCard from "../UI/PlaceCard";
import { PlaceDto, UserDto } from "../../helpers/dtos";

const PlaceItem: FC<{
  placeDto: PlaceDto;
  userDto: UserDto;
}> = ({ placeDto, userDto }) => {
  return <PlaceCard placeDto={placeDto} userDto={userDto} />;
};

export default PlaceItem;
