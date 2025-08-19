const { faker } = require("@faker-js/faker");

module.exports = {
  getFakeUser: () => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("##########")
    };
  }
};
