const express = require("express");
const User = require("../models/User");
const Chat = require("../models/Chat");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");

const jwt_secret = "React is a js library";
// Route 1: Endpoint for Creating a user using Post : api/auth/createuser. no login required
router.post(
  "/createuser",
  [
    //endpoint
    body("name", "Enter a valid name").isLength({ min: 3 }), //Validation checks for different credentials
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
    body("number", "Enter a valid number").isNumeric().isLength({ min: 10 }),
  ],
  async (req, res) => {
    let success = false;
    // If errors occurs then return a bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      //Checking if the user already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "This email already exist" });
      }
      //  Hashing the password with salt for security.This will be stored in the database
      const salt = await bcrypt.genSalt(10);
      const safepass = await bcrypt.hash(req.body.password, salt);

      //Creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: safepass,
        number: req.body.number,
      });
      // Using jsonwebtoken to give to the user as a responce
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      success = true;
      res.status(200).json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occurred");
    }
  }
);

//Route 2: Authentication for user crediantials using post:api/auth/login. No login required
router.post(
  "/login",
  [
    //endpoint
    body("email", "Enter a valid email").isEmail(), // validation checks for email and password
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    // If errors occurs then return a bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //Using Destructuring method of javascript
    try {
      const user = await User.findOne({ email }); // finding a user with the same email as entered by the user
      if (!user) {
        //return error if the email is not found
        return res
          .status(400)
          .json({ success, error: "Please enter correct email" });
      }

      //Compairing the passwords
      const passwordcheck = await bcrypt.compare(password, user.password);
      if (!passwordcheck) {
        // if password is not matched return error
        return res
          .status(401)
          .send({ success, error: "Please enter correct password" });
      }

      //If both the credentials are correct return payload
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      success = true;
      res.status(200).json({ success, authtoken, data }); // return authtoken as a responce
    } catch (error) {
      //This shows error when there is a typing mistake in code
      console.error(error.message);
      res.status(500).send("Some Error occurred");
    }
  }
);

// Route 3: Get logged in user details using post:api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
  //no validation required
  try {
    const userId = req.user.id; //finding user by id
    const user = await User.findById(userId).select("-password"); //Selecting the fields to display execpt password
    res.send(user);
  } catch (error) {
    //This shows error when there is a typing mistake in code
    console.error(error.message);
    res.status(500).send("Some Error occurred");
  }
});

router.post("/save-chat", (req, res) => {
  const { query, response, userId } = req.body;
  Chat.findOne({ userId: userId }).then((err, chat) => {
    const newChat = new Chat({
      query: query,
      response: response,
      userId: userId,
    });
    newChat.save().then((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Query Saved Successfully!" });
      }
    });
  });
});

router.post("/get-all-responses", (req, res) => {
  const userId = req.header("userId");
  Chat.find({ userId: userId }).then((result, err) => {
    if (err) {
      res.send(err);
    } else {
      let finalResult = result?.filter((a, b) => {
        return a.query !== "";
      });
      res.send(finalResult);
    }
  });
});

router.post("/get-specific-response", (req, res) => {
  const chatId = req.header("chatId");
  Chat.findOne({ _id: chatId }).then((result, err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
