const { rejected, successfull } = require("../Response/Response");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create user account
const CreateUser = async (req, res) => {
  try {
    const body = req.body;

    //checking all fields
    if (!body.username || !body.email || !body.password) {
      return res
        .status("500")
        .json(rejected(500, "all the field are required."));
    } else {
      //checking email elready exists
      const existUser = await User.findOne({ email: body.email });
      if (existUser) {
        return res
          .status(500)
          .json(rejected(500, "email already exist try Login."));
      }

      //if not exist hashing password for creation
      const salt = await bcrypt.genSalt();
      const hash = bcrypt.hashSync(body.password, salt);
      const user = await User.create({ ...body, password: hash });
      const accessToken = jwt.sign(
        {
          email: user.email,
          isRecruiter: user.isRecruiter,
        },
        process.env.JWT_token
      );
      return res
        .cookie("access_token", accessToken, { httpOnly: true })
        .status(201)
        .json(
          successfull(201, {
            UserID: user._id,
            username: user.username,
            email: user.email,
            isRecruiter: user.isRecruiter,
          })
        );
    }
  } catch (err) {
    return res.status(500).json(rejected(500, err.message));
  }
};

//Login user controller
const LoginUser = async (req, res) => {
  try {
    const body = req.body;

    //checking all the field are present
    if (!body.email || !body.password) {
      return res
        .status("500")
        .json(rejected(500, "all the field are required."));
    } else {
      //finding the user
      const user = await User.findOne({ email: body.email });
      if (!user) {
        return res.status(404).json(rejected(404, "user not found."));
      }

      //   checking the password is correct
      const isUserPass = await bcrypt.compare(body.password, user.password);
      if (isUserPass) {
        const accessToken = jwt.sign(
          {
            email: user.email,
            isRecruiter: user.isRecruiter,
          },
          process.env.JWT_token
        );
        return res
          .cookie("access_token", accessToken, { httpOnly: true })
          .status(201)
          .json(
            successfull(201, {
              UserID: user._id,
              username: user.username,
              email: user.email,
              isRecruiter: user.isRecruiter,
            })
          );
      } else {
        return res.status(404).json(rejected(404, "password incorrect."));
      }
    }
  } catch (err) {
    res.status(500).json(rejected(500, err.message));
  }
};

module.exports = {
  CreateUser,
  LoginUser,
};
