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
    linkPrecedence: {type: Sequelize.DataTypes.TEXT, defaultValue: "primary"},
  },
  {
    createdAt: true,
    updatedAt: true,
    paranoid: true,
    deletedAt: true,
  }
);

// Contact.sync({ alter: true })
//   .then(() => {
//     console.log("Table and Model synced successfully.");
//   })
//   .catch((error) => console.error(error));

module.exports = Contact;

// module.exports = (sequelize, DataTypes) => {
//     const contact = sequelize.define(
//         "Contacts",
//         {
//             id: {
// type: DataTypes.INTEGER,
// primaryKey: true,
// autoIncrement: true,
//             },
// phoneNumber: DataTypes.TEXT,
// email: DataTypes.TEXT,
// linkedId: DataTypes.INTEGER,
// linkPrecedence: DataTypes.TEXT,
//         },
//         {
//             deletedAt: DataTypes.DATE,
//         }
//     );

//     return contact;
// };
