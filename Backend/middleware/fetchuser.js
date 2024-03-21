var jwt = require("jsonwebtoken");

const jwt_secret = "React is a js library";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token"); //Get the token from the request header
  if (!token) {
    // if no token found send unauthorized access error message to the user
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, jwt_secret); //Verifying the token and jwt secret
    req.user = data.user;
    next(); //If verified then execute the next function
  } catch (error) {
    res.status(401).send("Please authenticate using a valid token");
  }
};

module.exports = fetchuser;
