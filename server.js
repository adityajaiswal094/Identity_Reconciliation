const app = require("./app.js");
const {config} = require("dotenv");
config({path: "./config/config.env"});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));