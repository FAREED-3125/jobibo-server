const { rejected, successfull } = require("../Response/Response");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Verify_token } = require("../jwt/jwt");

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
        process.env.JWT_token,
        {
          expiresIn: "15d",
        }
      );
      const refreshToken = jwt.sign(
        {
          email: user.email,
          isRecruiter: user.isRecruiter,
        },
        process.env.Jwt_refresh,
        {
          expiresIn: "1y",
        }
      );
      return res
        .cookie("access_token", accessToken)
        .cookie("refresh_token", refreshToken)
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
          process.env.JWT_token,
          {
            expiresIn: "15d",
          }
        );
        const refreshToken = jwt.sign(
          {
            email: user.email,
            isRecruiter: user.isRecruiter,
          },
          process.env.Jwt_refresh,
          {
            expiresIn: "1y",
          }
        );
        return res
          .cookie("access_token", accessToken)
          .cookie("refresh_token", refreshToken)
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

const RefreshTokenFunc = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;
    const payload = jwt.verify(refresh_token, process.env.Jwt_refresh);
    if (!payload) throw Error("now payload matches");
    else {
      const { exp, iat, ...others } = payload;
      const accessToken = jwt.sign(others, process.env.JWT_token, {
        expiresIn: "15d",
      });
      console.log({ refresh_token, others });

      res
        .cookie("access_token", accessToken)
        .cookie("refresh_token", refresh_token)
        .status(200)
        .json("successfull refreshed.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const MakeAsRecruiter = (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log(body);

    Verify_token(req, res, async () => {
      const user = await User.findByIdAndUpdate(id, body, { new: true });
      if (!user) {
        throw Error("User not found.");
      }
      const accessToken = jwt.sign(
        {
          email: user.email,
          isRecruiter: user.isRecruiter,
        },
        process.env.JWT_token,
        {
          expiresIn: "15d",
        }
      );
      const refreshToken = jwt.sign(
        {
          email: user.email,
          isRecruiter: user.isRecruiter,
        },
        process.env.Jwt_refresh,
        {
          expiresIn: "1y",
        }
      );
      return res
        .cookie("access_token", accessToken)
        .cookie("refresh_token", refreshToken)
        .status(201)
        .json(
          successfull(201, {
            UserID: user._id,
            username: user.username,
            email: user.email,
            isRecruiter: user.isRecruiter,
          })
        );
    });
  } catch (err) {
    res.status(500).json(rejected(500, err.message));
    console.log(err);
  }
};

module.exports = {
  CreateUser,
  LoginUser,
  RefreshTokenFunc,
  MakeAsRecruiter,
};
