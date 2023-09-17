const usersMock = [
  {
    id: 1,
    name: "Marky Zuckerborg",
    city: "Paris",
    country: "France",
    favoriteSport: "Tennis",
  },
  {
    id: 2,
    name: "Marie Christmas",
    city: "London",
    country: "UK",
    favoriteSport: "Swimming",
  },
  {
    id: 3,
    name: "Stevens C. Eagle",
    city: "Tokyo",
    country: "Japan",
    favoriteSport: "Running",
  },
  {
    id: 4,
    name: "John Doe",
    city: "Berlin",
    country: "Germany",
    favoriteSport: "Basketball",
  },
];

const singleUserMock = [
  {
    id: 4,
    name: "John Doe",
    city: "Berlin",
    country: "Germany",
    favoriteSport: "Basketball",
  }
]

const deletedUser = {
  id: 3,
  name: 'Stevens C. Eagle',
  city: 'Tokyo',
  country: 'Japan',
  favoriteSport: 'Running'
}

export default {
  usersMock,
  singleUserMock,
  deletedUser,
};