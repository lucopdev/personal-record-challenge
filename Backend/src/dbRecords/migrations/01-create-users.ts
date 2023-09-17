import { DataTypes, Model, QueryInterface } from "sequelize";
import { UserType } from "../../types/UserType";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<UserType>>("users", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
        field: "favorite_sport",
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable("users");
  },
};
