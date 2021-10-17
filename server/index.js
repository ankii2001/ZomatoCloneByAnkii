// Importing ENV Variables 
require("dotenv").config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// Configs
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

// microservice routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Reviews from "./API/Reviews";
import Orders from "./API/Orders";
import User from "./API/User";
import Images from "./API/Images";
import Menu from "./API/Menu";


// Database connection
import ConnectDB from "./Database/connection";

const zomato = express();

// applications Middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false}));
zomato.use(helmet()); // for security 
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// passport cofiguration
googleAuthConfig(passport);
routeConfig(passport);

// Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/review", Reviews);
zomato.use("/order", Orders);
zomato.use("/user", User);
zomato.use("/image", Images);
zomato.use("/menu", Menu);



zomato.get("/",(req, res) => res.json({ message : "Setup Success"}));


zomato.listen(4000, () => 
    ConnectDB() 
        .then(() => console.log("Server is runnning 🏆"))
        .catch(() =>
            console.log("Server is running, but database connection failed😕")
        )
);