const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "you're not authorized!" });
    }

    const payload = jwt.verify(token, JWT_SECRET_KEY);
    req.user = payload;

    if (roles.length > 0 && !roles.includes(payload.role)) {
      return res
        .status(401)
        .json({ status: false, message: "you're not authorized!" });
    }

    next();
  };
};

// const jwt = require("jsonwebtoken");
// const { JWT_SECRET_KEY } = process.env;

// module.exports = {
//   authorize: (roles = []) => {
//     if (typeof roles === "string") {
//       roles = [roles];
//     }

//     return (req, res, next) => {
//       const token = req.headers["authorization"];
//       if (!token) {
//         return res
//           .status(401)
//           .json({ status: false, message: "you're not authorized! No Token" });
//       }

//       const payload = jwt.verify(token, JWT_SECRET_KEY);
//       console.log(payload);
//       req.user = payload;

//       if (roles.length > 0 && !roles.includes(payload.role)) {
//         return res
//           .status(401)
//           .json({ status: false, message: "you're not authorized! roles" });
//       }
//       next();
//     };
//   },
// };
