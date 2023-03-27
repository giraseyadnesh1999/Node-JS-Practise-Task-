const User = require("../Model/Schema");
const express = require("express");
const router = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const multer = require("multer");
debugger;
const imgUpload = multer({
  dest: "public",
  limits: { fileSize: "1000000" },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|png|jpg)$/)) {
      return cb(new Error("please upload a jpg/png/jpeg image"));
    }
    cb(undefined, true);
  },
});

router.post("/imageUpload", imgUpload.single("upload"), (req, res) => {
  res.send("Image upload Succesfully");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create a new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    // Validate email and password
    if (!req.body.email || !req.body.password) {
      throw new Error("Email and password are required");
    }
    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    // Compare password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw new Error("Invalid email or password");
    }
    // Generate access token
    const accessToken = jwt.sign({ email: user.email }, process.env.secretkey);
    // Generate refresh token
    const refreshToken = jwt.sign({ email: user.email }, "secret", {
      expiresIn: "1h",
    });
    // Save refresh token in database
    user.refreshToken = refreshToken;
    await user.save();
    // Send access and refresh tokens
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/refreshToken", async (req, res) => {
  try {
    // Verify refresh token
    const { email, refreshToken } = req.body;
    const user = await User.findOne({ email, refreshToken });
    if (!user) {
      throw new Error("Invalid refresh token");
    }
    // Generate new access token
    const accessToken = jwt.sign({ email: user.email }, "secret");
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get("/send", auth, (req, res) => {
  res.send("You your token verified");
});
// Search api by given in name
router.get("/search/:key", async (req, res) => {
  let data = await User.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  console.log(data);
  res.send(data);
});


module.exports = router;
//rm -rf .git delete github repo
