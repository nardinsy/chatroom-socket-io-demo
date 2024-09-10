import { FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared-UI/Avatar";
import Card from "../../shared-UI/Card";
import { UserDto } from "../../helpers/dtos";

type UserItemProps = { userDto: UserDto; key: string };

const UserItem: FC<UserItemProps> = ({ userDto }) => {
  //needs absolut picture url
  const { userId, username, pictureUrl, placeCount } = userDto;

  return (
    <li
      className="m-4 min-w-32 border rounded-md border-user-item-border"
      key={userId}
      data-testid={userId}
    >
      <Card className="p-0">
        <Link
          to={{
            pathname: `/places/${userId}`,
            state: { userDto },
          }}
          className="flex items-center w-full h-full p-2 hover:bg-gray-light"
        >
          <div className="w-12 h-12 mr-4">
            <Avatar pictureUrl={pictureUrl} alt={username} width={"3rem"} />
          </div>
          <div>
            <p className="mb-2 text-blue-dark text-sm font-bold">{username}</p>
            <p className="text-xs text-gray">
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;

// border border-gray-dark rounded-lg
