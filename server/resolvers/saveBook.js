const User = require("../models/User");

const saveBook = async (_, { input }, context) => {
  const { id } = context.user;

  // find the user and update the savedBooks field
  try {
    return await User.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          savedBooks: input,
        },
      },
      { new: true, runValidators: true }
    ).populate("savedBooks");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = saveBook;
