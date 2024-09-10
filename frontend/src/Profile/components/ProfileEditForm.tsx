import { useState, FC, MouseEvent } from "react";
import Button from "../../shared-UI/Button";
import useRequiredAuthContext from "../../hooks/use-required-authContext";
import { ProfileSettingsPageT } from "../pages/ProfileSettingsPage";
import ProfileEditFormUserPicture from "./ProfileEditFormUserPicture";
import EditPasswordButton from "./EditPasswordButton";
import EditUserInfoForm from "./EditUserInfoForm";
import { validateNewUsername } from "../../helpers/inputsValidation";

const ProfileEditForm: FC<ProfileSettingsPageT> = ({
  changeProfilePicture,
  changePassword,
  changeUsername,
}) => {
  const authContext = useRequiredAuthContext();
  if (!authContext.isLoggedin) {
    throw new Error("User in not logged in, Please login first");
    //redirect to login form
  }

  const [profilePicture, setProfilePicture] = useState<File | "noChange">(
    "noChange"
  );
  const [username, setUsername] = useState(authContext.username);
  const [isDirty, setIsDirty] = useState(false);

  const onChangeImage = (fileFormatFile: File) => {
    setProfilePicture(fileFormatFile);
    setIsDirty(true);
  };

  const onChangeUsername = (username: string) => {
    setUsername(username);
    setIsDirty(true);
  };

  const formSubmitHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (validateNewUsername(username, authContext.username)) {
      changeUsername(username);
    }

    if (profilePicture !== "noChange") {
      changeProfilePicture(profilePicture);
      //show message
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        className="relative flex flex-col w-3/5 min-w-96 shadow-default p-8 rounded-4xl"
        id={"1"}
      >
        <div className="flex justify-around p-4">
          <h2 className="font-bold">Edit Profile</h2>

          <ProfileEditFormUserPicture
            onChangeImage={onChangeImage}
            userPictureUrl={authContext.userPictureUrl}
            username={authContext.username}
            token={authContext.token}
            changeProfilePicture={changeProfilePicture}
          />
        </div>

        <div className="w-full flex flex-col p-4 mb-4">
          <EditUserInfoForm
            username={authContext.username}
            changeUsername={onChangeUsername}
          />
        </div>

        <div className="flex justify-around">
          <Button
            type="submit"
            onClick={formSubmitHandler}
            isDisabled={!isDirty}
            action={"submit"}
            className="w-32"
          >
            Update Info
          </Button>

          <EditPasswordButton changePassword={changePassword} />
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;

// const history = useHistory();

// useEffect(() => {
//   setAvatarURL(userPictureUrl);
// }, [userPictureUrl]);
