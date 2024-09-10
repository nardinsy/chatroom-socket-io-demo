import { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import MyPlacePage from "../places/pages/MyPlacesPage";
import LogoutModal from "../Authentication/Logout/LogoutModal";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import NewPlacePage from "../places/pages/NewPlacePage";
import { createAbsoluteApiAddress } from "../helpers/api-url";
import {
  Base64,
  NewPlace,
  PlaceDto,
  PlaceInfoCardWithPictire,
  UserDto,
  placeInfoCard,
} from "../helpers/dtos";
import useRequiredAuthContext from "../hooks/use-required-authContext";
import useRequiredBackend from "../hooks/use-required-backend";
import useRequiredToastContext from "../hooks/use-required-toastContext";

const Authorized = () => {
  // console.log("Authorized Component Render");

  const [places, setPlaces] = useState<PlaceDto[]>([]);
  const [loading, setLoading] = useState(true);
  const authContext = useRequiredAuthContext();
  const showSuccessToast = useRequiredToastContext().showSuccess;
  const showErrorToast = useRequiredToastContext().showError;

  if (!authContext.isLoggedin) {
    throw new Error("User most be logged in, Please Login again");
  }

  const backend = useRequiredBackend();
  const history = useHistory();

  const getLoggedUserPlaces = async () => {
    const data = await backend.getLoggedUserPlaces(authContext.token);

    const places = data.places;
    setPlaces(places);
    setLoading(false);
  };

  // const addToast = (type: ToastTypes, message: string) => {
  //   const toast = generateToastObject(type, message);
  //   toastCtx.addToast(toast);
  // };

  const addPlace: (place: PlaceInfoCardWithPictire) => Promise<void> = async (
    place
  ) => {
    const newPLaceBlob = place.picture;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const newImageDataURLFormat = reader.result as Base64<"jpeg">;
      //reader.result: data:image/jpeg;base64

      const newplace: NewPlace = {
        title: place.title,
        description: place.description,
        address: place.address,
        picture: newImageDataURLFormat,
      };

      const data = await backend.addPlace(newplace, authContext.token);

      const placeData = new PlaceDto(
        data.place.title,
        data.place.description,
        data.place.address,
        data.place.pictureId,
        data.place.placeId,
        data.place.creator,
        data.place.pictureUrl
      );

      setPlaces((pre) => (pre ? [...pre, placeData] : [placeData]));

      showSuccessToast("Add place successfully");
      history.push("/myplace");
    };

    reader.readAsDataURL(newPLaceBlob);
  };

  const editPlace = async (placeInfo: placeInfoCard & { id: string }) => {
    const data = await backend.editPlace(placeInfo, authContext.token);

    const editedPlace = places.find((place) => place.placeId === placeInfo.id);

    if (editedPlace) {
      editedPlace.title = placeInfo.title;
      editedPlace.description = placeInfo.description;
      editedPlace.address = placeInfo.address;
    }

    setPlaces((pre) => [...pre]);
    showSuccessToast("Edit place successfully");
  };

  const deletePlaceById = async (placeId: string) => {
    await backend.deletePlaceById(placeId, authContext.token);

    console.log("delete place front");

    setPlaces((pre) => {
      return places.filter((place) => place.placeId !== placeId);
    });

    showSuccessToast("Delete place successfully");
  };

  const changeProfilePicture = async (userNewImage: File | undefined) => {
    // imuserNewImage: File {name: '2021-10-22 7.18.jpg', lastModified: 1704866449845, lastModifiedDate: Wed Jan 10 2024 09:30:49 GMT+0330 (Iran Standard Time), webkitRelativePath: '', size: 1156073, …}

    if (!userNewImage) {
      await sendHttpRequestForChangeProfilePicture(undefined);
      localStorage.removeItem("userPictureUrl");
      authContext.setPictureUrl(undefined);
      return;
    }

    let data: { userInfo: UserDto };
    const reader = new FileReader();

    reader.onloadend = async () => {
      const newImageDataURLFormat = reader.result; //reader.result: data:image/jpeg;base64
      if (!newImageDataURLFormat) throw new Error("Can not read file");

      data = await sendHttpRequestForChangeProfilePicture(
        newImageDataURLFormat
      );

      if (!data) throw new Error("error");
      const url = data.userInfo.pictureUrl as string;
      const absPictureUrl = createAbsoluteApiAddress(url);

      localStorage.removeItem("userPictureUrl");
      localStorage.setItem("userPictureUrl", absPictureUrl);
    };

    reader.readAsDataURL(userNewImage);
    authContext.setPictureUrl(URL.createObjectURL(userNewImage));

    showSuccessToast("Change profile picture successfully");
  };

  const sendHttpRequestForChangeProfilePicture = async (
    pictureFile: string | ArrayBuffer | undefined
  ) => {
    return await backend.changeProfilePicture(pictureFile, authContext.token);
  };

  const changePassword = async (newPassword: string) => {
    await backend.changePassword(newPassword, authContext.token);

    showSuccessToast("Change password successfully");
  };

  const changeUsername = async (newUsername: string) => {
    await backend.changeUsername(newUsername, authContext.token);
    authContext.setUsername(newUsername);

    showSuccessToast("Change username successfully");
  };

  return (
    <>
      <Route path="/myplace">
        <MyPlacePage
          places={places}
          getLoggedUserPlaces={getLoggedUserPlaces}
          editPlace={editPlace}
          deletePlace={deletePlaceById}
          loading={loading}
        />
      </Route>

      <Route path="/new">
        <NewPlacePage addPlace={addPlace} />
      </Route>

      <Route path="/logout">
        <LogoutModal />
      </Route>

      <Route path="/profile-settings">
        <ProfileSettingsPage
          changeProfilePicture={changeProfilePicture}
          changePassword={changePassword}
          changeUsername={changeUsername}
        />
      </Route>

      {/* <Route path="/photo">
        <PictureModal
          pictureUrl={authContext.userPictureUrl}
          showChevrons={true}
          ellipsisDropdownItems={ellipsisDropdownItems}
        />
      </Route> */}
    </>
  );
};

export default Authorized;
