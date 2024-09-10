import { FC } from "react";
import Button from "../../../shared-UI/Button";

const FollowButton: FC = () => {
  // return <div className="">Follow</div>;
  return (
    <Button action="submit" type="submit" onClick={() => {}} id="follow">
      Follow
    </Button>
  );
};

export default FollowButton;
