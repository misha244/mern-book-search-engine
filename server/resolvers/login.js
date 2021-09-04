const { AuthenticationError } = require("apollo-server-errors");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const login = async (_, { input }) => {
  const { email, password } = input;
  const user = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationError(
      "User does not exist! Please check your credentials and try again!"
    );
  }

  const isValidPassword = await user.validatePassword(password);

  if (!isValidPassword) {
    throw new AuthenticationError(
      "Password does not match to this account. Please try again"
    );
  }

  const token = signToken({
    id: user._id,
    email: user.email,
    username: user.username,
  });

  return {
    token,
    user,
  };
};

module.exports = login;
