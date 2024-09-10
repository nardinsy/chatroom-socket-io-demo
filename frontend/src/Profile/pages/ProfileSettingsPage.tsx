import ProfileEditForm from "../components/ProfileEditForm";
import { FC } from "react";

export interface ProfileSettingsPageT {
  changeProfilePicture: (userNewImage: File | undefined) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  changeUsername: (newUsername: string) => Promise<void>;
}

const ProfileSettingsPage: FC<ProfileSettingsPageT> = ({
  changeProfilePicture,
  changePassword,
  changeUsername,
}) => {
  return (
    <div>
      <ProfileEditForm
        changeProfilePicture={changeProfilePicture}
        changePassword={changePassword}
        changeUsername={changeUsername}
      />
    </div>
  );
};

export default ProfileSettingsPage;
