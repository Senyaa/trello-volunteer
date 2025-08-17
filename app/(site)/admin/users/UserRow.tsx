import { FC } from "react";

interface UserRowProps {
  username: string;
  isAdmin: boolean;
}

const UserRow: FC<UserRowProps> = ({ username, isAdmin }) => {
  return (
    <ul className="mb-2">
      <li>
        {isAdmin && "✨"}
        {username}
      </li>
    </ul>
  );
};

export default UserRow;
