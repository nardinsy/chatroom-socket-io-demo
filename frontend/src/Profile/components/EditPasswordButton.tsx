import { useState, MouseEvent, FC } from "react";
import Button from "../../shared-UI/Button";
import PasswordChangeModal from "./PasswordChangeModal";

interface EditPasswordT {
  changePassword: (newPAssword: string) => void;
}

const EditPasswordButton: FC<EditPasswordT> = ({ changePassword }) => {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const changePasswordHandler = (newPassword: string) => {
    changePassword(newPassword);
    //show message
  };

  const openChangePasswordModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowChangePasswordModal(true);
  };

  const closeChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <>
      <Button
        type="submit"
        onClick={openChangePasswordModal}
        action={"edit"}
        className="w-40"
      >
        Change Password
      </Button>

      {showChangePasswordModal && (
        <PasswordChangeModal
          closeChangePasswordModal={closeChangePasswordModal}
          onPasswordChange={changePasswordHandler}
        />
      )}
    </>
  );
};

export default EditPasswordButton;
