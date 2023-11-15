const { rejected } = require("../Response/Response");
const jwt = require("jsonwebtoken");
const Verify_token = async (req, res, next) => {
  console.log({
    access_token: process.env.JWT_token,
    refresh_token: process.env.Jwt_refresh,
  });
  try {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
      return res.status(404).json(rejected(404, "Please Sign in or login."));
    }
    await jwt.verify(token, process.env.JWT_token, (err, user) => {
      if (err) {
        return res.status(500).json(rejected(500, err));
      } else {
        req.user = user;
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const Verify_recruiter = (req, res, next) => {
  try {
    Verify_token(req, res, () => {
      if (req.user.isRecruiter) next();
      else return res.status(500).json(rejected(500, "you are not autorised."));
    });
  } catch (err) {
    console.log(err);
  }
};

const Verify_User = (req, res, next) => {
  Verify_token(req, res, () => {
    if (req.user) next();
    else
      return res
        .status(400)
        .json(rejected(400, "Please Register you account."));
  });
};

module.exports = {
  Verify_token,
  Verify_recruiter,
  Verify_User,
};
