const UserModel = require("../models/User");
const session = require("express-session");

exports.hello = (req, res) => {
  res.send("TEST IT IS WORKING...");
};

exports.updateUser = async (req, res) => {
  const userId = req.session.userId;

  console.log(userId);

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: req.body }
    );

    if (updatedUser) {
      res.status(200).send({ message: "User updated successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

exports.fetchUserById = async (req, res) => {
  const userId = req.session.userId;
  console.log("this is the session:", req.session);
  try {
    const user = await UserModel.findOne({ _id: userId });

    console.log(user);
    const { username, _id, email, profileImg } = user;
    res.status(200).send({ username, id: _id, email, profileImg });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "User not found!" });
  }
};
