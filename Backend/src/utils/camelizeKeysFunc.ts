import IUserBodySnakized from '../interfaces/IUserBodySnakized';
import UserBodyType from '../types/UserBodyType';

function camelizeKeys(obj: IUserBodySnakized[]): UserBodyType[] {
  const newObj = obj.map((item: IUserBodySnakized): UserBodyType => {
    return {
      name: item.name,
      city: item.city,
      country: item.country,
      favoriteSport: item.favorite_sport,
    }
  })
  return newObj;
}

export default camelizeKeys;