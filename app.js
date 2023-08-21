import express from "express";
import { config } from "dotenv";
import {identifyContact} from "./controller.js";

config({path: "./config/config.env"});

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    console.log("Default route");
    // res.status(200).json({route: "Default route"});
    res.send("hello world");
});

app.post("/identify", identifyContact);