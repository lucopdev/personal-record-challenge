import { DataTypes } from "sequelize";
import database from './index';

const User = database.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favoriteSport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  modelName: 'user',
  tableName: 'users',
  timestamps: false,
  underscored: true,
});

export default User;