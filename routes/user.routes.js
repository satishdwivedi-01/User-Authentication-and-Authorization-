import express from "express";
import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const routes = express.Router();

routes.get("/register", (req, res) => {
  res.render("register");
});

routes.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (password.length < 6) {
      return res.status(400).send({
        error: "Validation failed",
        message: "Password must be at least 6 characters long", // Custom error message
      });
    }

    const Rounds_of_Encryption = 10; // balaced(btwn performance and security) round for hashing
    const hashed_password = await bcrypt.hash(
      req.body.password,
      Rounds_of_Encryption
    ); // for encryption of passwornd before saving to DB

    const newUser = await user.create({
      username: req.body.username,
      email: req.body.email,
      password: hashed_password,
    });
    res
      .status(201)
      .redirect("/user/login");
  } catch (error) {
    if (error.name === "ValidationError") {
      const msg = error.message;
      return res.status(400).send({
        error: "Validation failed",
        message: msg,
      });
    }
    // return res.send(error);
  }
});

routes.get("/login",(req, res) => {
  res.render("login");
});
routes.post("/login",async (req, res) => {
  const { username, password } = req.body;
  const usern = await user.findOne({ username });
  if (!usern) {
    return res.status(404).send({ message: "Invalid credentials" });
  }

  const ismatch = await bcrypt.compare(password, usern.password);
  if (ismatch) {
    const token = jwt.sign(
      { userid: usern.id, username: usern.username, email: usern.email },
      process.env.JWT_SECRET_KEY ,{ expiresIn: '3h' }
    );

    res.cookie("token", token);
    res.redirect('/home')
  } else {
    return res.status(404).send({ message: "Invalid credentials" });
  }
});

export default routes;
