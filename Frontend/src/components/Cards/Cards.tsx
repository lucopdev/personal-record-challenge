import ICardProps from "../../interface/IProps";
import UserType from "../../types/UserType";
import "./Cards.css";

function Cards(props: ICardProps) {
  const { data, handleDelete } = props;
  return (
    <div>
      <div className="cards-container">
        {data.length > 0 &&
          data?.map((user: UserType, index: number) => (
            <div className="card-div" key={index}>
              <p>Name: {user.name}</p>
              <p>City: {user.city}</p>
              <p>Country: {user.country}</p>
              <p>Favorite sport: {user.favoriteSport}</p>
              <button
                className="delete-btn"
                data-testid="delete-button"
                onClick={() => handleDelete(user)}
              ></button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Cards;
