import express from "express"
import routes from "./routes/user.routes.js";
import home_routes from "./routes/home.routes.js";
import connectToDB from "./config/mongoose.config.js";
import cookieParser from "cookie-parser";

import dotenv from 'dotenv';

const app = express()


// Load env environment variables
dotenv.config();

connectToDB()

// EJS (Embedded JavaScript) is a templating engine for Node.js that allows you to embed JavaScript    code within HTML. It's commonly used to generate dynamic HTML pages by rendering data into templates. teplates will be in views folder
// Set EJS as the view engine
app.set('view engine', 'ejs');   // ejs will be same as html

app.use(cookieParser()) // Middleware to parse cookies

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.redirect("/user/register")
})

app.use("/user",routes)
app.use("/",home_routes)

app.listen(3000)