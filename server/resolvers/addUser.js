const { AuthenticationError } = require("apollo-server-errors");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const addUser = async (_, { input }) => {
  console.log(User);
  const { username, email, password } = input;

  const userAlreadyExists = await User.findOne({ email });

  if (!userAlreadyExists) {
    const user = await User.create({
      username,
      email,
      password,
    });

    // if the user cannot be created an error will be thrown
    if (!user) {
      throw new AuthenticationError(
        "Oops! There was an error! Please try again!"
      );
    }

    const token = signToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    return {
      token,
      user,
    };
  } else {
    throw new AuthenticationError(
      "Oops! There already exists a user with these credentials"
    );
  }
};

module.exports = addUser;
