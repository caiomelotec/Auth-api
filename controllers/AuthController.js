const UserModel = require("../models/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).send({ message: "Username already registered" });
      } else if (existingUser.email === email) {
        return res.status(400).send({ message: "Email already registered" });
      }
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

exports.login = async (req, res) => {
  const userCred = req.body;
  try {
    const user = await UserModel.findOne({ email: userCred.email });
    const { _id, username, email, password } = user._doc;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const checkPassword = bycrypt.compareSync(userCred.password, password);

    const token = jwt.sign({ id: _id }, "jwtkey");

    if (!token) {
      console.log("error genarating token");
      console.log(token);
      return res.status(500).send({ message: "Something went wrong" });
    }

    if (!checkPassword) {
      res.status(400).send({ message: "Invalid password" });
    }

    if (checkPassword) {
      req.session.token = token;
      req.session.userId = _id.toString();
      req.session.save();
      res.status(200).send({
        message: "The login was successfull",
        userInfo: {
          userId: _id,
          username: username,
          email: email,
          profileImg: user.profileImg,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

exports.google = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      // check if user exists in the database
      // if user exists, check if the password is correct
      // if password is correct, create a jwt token and save it to the session
      // return the user info and a message indicating that the login was successful
      const token = jwt.sign({ id: user._id }, "jwtkey");
      req.session.token = token;
      req.session.userId = user._id.toString();
      req.session.save();
      const { password, _id, email, username, profileImg } = user._doc;
      res.status(201).send({
        message: "User logged in successfully",
        userInfo: { email, userId: _id.toString(), profileImg, username },
      });
    } else {
      // create a new user with a random password
      // create a jwt token and save it to the session
      // return the user info and a message indicating that the user was created
      const generatedPassword = Math.random().toString(36).substring(2, 10);
      const hashedPassword = bycrypt.hashSync(generatedPassword, 10);
      const randomUserName = req.body.username + Date.now();
      const newUser = await UserModel.create({
        username: randomUserName,
        email: req.body.email,
        password: hashedPassword,
        profileImg: req.body.photo,
      });

      const token = jwt.sign({ id: newUser._id }, "jwtkey");
      req.session.token = token;
      req.session.userId = newUser._id.toString();
      req.session.save();

      const { password, email, _id, username, profileImg } = newUser._doc;
      res.status(201).send({
        message: "User created successfully",
        userInfo: { email, userId: _id.toString(), profileImg, username },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
    } else {
      // Session successfully destroyed
      res.status(200).send({ message: "Logout successful" });
    }
  });
};
