import jwt from "jsonwebtoken";

// Generate token from login info
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "privatekey",
    { expiresIn: "1h" }
  );
};

// Check if the user is logged in
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET || "privatekey", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid token." });
      } else {
        req.userInfo = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token." });
  }
};

// Check if the logged user is admin user
export const isAdmin = (req, res, next) => {
  if (req.userInfo && req.userInfo.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid admin token." });
  }
};
