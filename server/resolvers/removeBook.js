const { User } = require("../models");

// we target find a specific user containing a specific book id and we remove that book id from the "savedBooks" array
const removeBook = async (_, { bookId }, context) => {
  try {
    return await User.findOneAndUpdate(
      { _id: context.user.id },
      { $pull: { savedBooks: { bookId } } },
      { new: true }
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = removeBook;
