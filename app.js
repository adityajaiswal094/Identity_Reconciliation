const express = require("express");
const { config } = require("dotenv");
const identifyContact = require("./controller.js");
const db = require("./database/databaseConnection.js");
const Contact = require("./database/ContactModel.js");
const LinkedContact = require("./database/LinkedContactModel.js");

config({ path: "./config/config.env" });

const app = express();

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((error) => console.error(error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Home route");
});

app.get("/database", async (req, res) => {
  await Contact.findAll()
    .then((contacts) => {
      console.log(contacts);
    })
    .catch((error) => console.error(error));

  await LinkedContact.findAll().then((resObjs) => {
    console.log(resObjs);
  }).catch((error) => console.error(error));
    res.sendStatus(200);
});

app.post("/identify", identifyContact);

module.exports = app;
