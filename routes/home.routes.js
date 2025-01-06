import express from "express";
import auth from "../middlewares/auth.js";

const home_routes = express.Router();

home_routes.get("/home", auth, (req, res) => {
  const user = {
    name: req.user.username,
    email: req.user.email,
  };
  res.render("home", { user }); // Removed the extra closing parenthesis
});

export default home_routes;
