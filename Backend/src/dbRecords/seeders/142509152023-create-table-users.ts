import { QueryInterface } from "sequelize";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "Marky Zuckerborg",
          city: "Paris",
          country: "France",
          favorite_sport: "Tennis",
        },
        {
          id: 2,
          name: "Marie Christmas",
          city: "London",
          country: "UK",
          favorite_sport: "Swimming",
        },
        {
          id: 3,
          name: "Stevens C. Eagle",
          city: "Tokyo",
          country: "Japan",
          favorite_sport: "Running",
        },
        {
          id: 4,
          name: "Chucky Nariz",
          city: "Berlin",
          country: "Germany",
          favorite_sport: "Basketball",
        },
      ],
      {}
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete("users", {});
  },
};
