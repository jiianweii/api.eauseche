const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // IF TOKEN DON'T EXIST
    if (!token) {
      return next(
        res.status(401).json({
          status: "error",
          message: "You are not logged in",
        })
      );
    }

    // VERIFICATION
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser)
      return next(
        res.status(401).json({
          status: "error",
          message:
            "The token for the user no longer exist. Please log in again",
        })
      );

    req.user = currentUser;
  } catch (err) {
    return next(
      res.status(401).json({
        status: "error",
        message: err.message,
      })
    );
  }

  next();
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        res.status(400).json({
          status: "error",
          message: "Email / Password is not defined",
        })
      );
    }

    const user = await User.findOne({ email }).select(
      "id name +password isAdmin"
    );

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        res.status(401).json({
          status: "error",
          message: "Incorrect email or password",
        })
      );
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
};
