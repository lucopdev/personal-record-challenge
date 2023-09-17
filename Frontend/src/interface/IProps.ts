import UserType from "../types/UserType";

interface ICardProps {
  data: UserType[];
  handleDelete: (user: UserType) => void;
}

export default ICardProps;