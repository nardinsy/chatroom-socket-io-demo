import UserItem from "./UserItem";
import Card from "../../shared-UI/Card";
import { createAbsoluteApiAddress } from "../../helpers/api-url";
import { UserDto } from "../../helpers/dtos";
import Spinner from "../../shared-UI/Spinner";

const UsersList = ({
  users,
  loading,
}: {
  users: UserDto[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen"
        data-testid="users-spinner"
      >
        <Spinner />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Card className="w-2/5 text-center shadow-default">
          <h2>No user found.</h2>
        </Card>
      </div>
    );
  }

  const userItems = users.map((user) => {
    const pictureUrl = user.pictureUrl
      ? createAbsoluteApiAddress(user.pictureUrl)
      : undefined;
    return <UserItem key={user.userId} userDto={{ ...user, pictureUrl }} />;
  });

  return (
    <ul
      className="flex justify-center flex-wrap my-20 p-0 w-full"
      data-testid="users-list"
    >
      {userItems}
    </ul>
  );
};

export default UsersList;
