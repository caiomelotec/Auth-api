const UserModel = require("../models/User");
const bycrypt = require("bcryptjs");
exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser.username === username) {
      return res.status(400).send({ message: "Username already registered" });
    } else if (existingUser.email === email) {
      return res.status(400).send({ message: "Email already registered" });
    }

    const hashedPassword = bycrypt.hashSync(password, 10);

    const user = await UserModel.create({
      username,
      password: hashedPassword,
      email,
    });
    if (user) {
      res.status(201).send({ message: "User created successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};
