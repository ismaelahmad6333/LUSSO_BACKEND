const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin user",
    address: "Zamboanga city",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "Juan delacruz",
    address: "Metro manila",
    email: "Juan@gmail.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "Cardo Dalisay",
    address: "Metro manila",
    email: "cardo@gmail.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

module.exports = users;
