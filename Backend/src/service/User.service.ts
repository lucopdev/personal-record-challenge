import { Op } from 'sequelize';
import User from '../dbRecords/model/User.model';
import UserBodyType from '../types/UserBodyType';
import errors from '../utils/errorMessages';

const getUser = async (query: string) => {
  const result = await User.findAll({ where: {
    [Op.or]: [
      { name: { [Op.like]: `%${query}%` }},
      { city: { [Op.like]: `%${query}%` }},
      { country: { [Op.like]: `%${query}%` }},
      { favoriteSport: { [Op.like]: `%${query}%` }},
    ],
  },
});

  if (result.length === 0) {
    return { status: 'NOT_FOUND', code: 404, data: errors.errorMessage404 };
  }
  
  return { status: 'SUCCESSFUL', code: 200, data: result };
};

const createUser = async (userArray: UserBodyType[]) => {
  userArray.map(async (user) => {
    if (!user.name || !user.city || !user.country || !user.favoriteSport) {
      return { status: 'INVALID_ENTRY', code: 400, data: errors.errorMessage400 };
    }

    const userResponse = await User.findOne({ where: { name: user.name } });
    const userRegistered = userResponse?.dataValues.name;
  
    if (user.name === userRegistered) {
      return { status: 'CONFLIT', code: 409, data: errors.errorMessage409 };
    }

    const result = await User.create(user);
      
    if (!result) {
      return { status: 'NOT_FOUND', code: 404, data: errors.errorMessage404 };
    }

    return { status: 'SUCCESSFUL', code: 200, data: { message: 'User successfully registered.'} };
    });
};

const deleteUser = async (user: UserBodyType) => {
  
  await User.destroy({ where: { name: user.name }})
};

export default {
  getUser,
  createUser,
  deleteUser,
};
