import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import PlacesList from "../../places/components/PlacesList";
import { UserDto, PlaceDto } from "../../helpers/dtos";
import useRequiredBackend from "../../hooks/use-required-backend";

interface LocationState {
  userDto: UserDto;
}

const AnyUserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<PlaceDto[]>([]);
  const [loading, setLoading] = useState(true);

  const backend = useRequiredBackend();

  const { userId } = useParams() as { userId: string };
  const { state } = useLocation<LocationState>();
  const userDto = state.userDto;

  useEffect(() => {
    const fetchPlaces = async () => {
      const data = await backend.getAnyUserPlacesByUserId(userId);
      setLoadedPlaces(data.places);
      setLoading(false);
    };
    fetchPlaces();
  }, [userId]);

  return (
    <div>
      <PlacesList
        userPlaces={loadedPlaces}
        userDto={userDto}
        editable={false}
        loading={loading}
      />
    </div>
  );
};

export default AnyUserPlaces;
