import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserDto, PlaceDto } from "../../helpers/dtos";
import useRequiredBackend from "../../hooks/use-required-backend";
import Spinner from "../../shared-UI/Spinner";
import PlacePageContent from "./PlacePageContent";
import { createAbsoluteApiAddress } from "../../helpers/api-url";

interface RouteParams {
  placeId: string;
}

const PlacePage: FC = () => {
  const backend = useRequiredBackend();

  const {
    state,
  }: {
    state: {
      placeDto: PlaceDto;
      userDto: UserDto;
    };
  } = useLocation();

  const { placeId } = useParams<RouteParams>();

  const [placeDto, setPlaceDto] = useState<PlaceDto>();
  const [userDto, setUserDto] = useState<UserDto>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async (placeId: string) => {
      setLoading(true);
      const result = await backend.getPlaceById(placeId);
      const absPlacePictureUrl = createAbsoluteApiAddress(
        result.placeDto.pictureUrl
      );
      const placeDto = { ...result.placeDto, pictureUrl: absPlacePictureUrl };

      const absolutePictuteUrl = result.userDto.pictureUrl
        ? createAbsoluteApiAddress(result.userDto.pictureUrl)
        : undefined;
      const userDto = { ...result.userDto, pictureUrl: absolutePictuteUrl };

      setPlaceDto(placeDto);
      setUserDto(userDto);
      setLoading(false);
    };

    if (state) {
      setPlaceDto(state.placeDto);
      setUserDto(state.userDto);
      setLoading(false);
    } else {
      fetchPlace(placeId);
    }

    window.scrollTo(0, 0);
    return () => {};
  }, [placeId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  } else {
    return <PlacePageContent placeDto={placeDto!} userDto={userDto!} />;
  }
};

export default PlacePage;
