const Sequelize = require("sequelize");
const db = require("./databaseConnection");

const Contact = db.define(
  "Contact",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phoneNumber: Sequelize.DataTypes.TEXT,
    email: Sequelize.DataTypes.TEXT,
    linkedId: Sequelize.DataTypes.INTEGER,
    linkPrecedence: { type: Sequelize.DataTypes.TEXT, defaultValue: "primary" },
  },
  {
    createdAt: true,
    updatedAt: true,
    paranoid: true,
    deletedAt: true,
  },
  // {
  //   indexes: [
  //     {
  //       fields: ["phoneNumber", "email", "linkPrecedence"],
  //       using: "BTREE",
  //     },
  //   ],
  // }
);

// Contact.sync({ alter: true })
//   .then(() => {
//     console.log("Table and Model Contact synced successfully.");
//   })
//   .catch((error) => console.error(error));

module.exports = Contact;
