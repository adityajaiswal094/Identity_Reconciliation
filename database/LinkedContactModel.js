const Sequelize = require("sequelize");
const db = require("./databaseConnection");

const LinkedContact = db.define(
  "LinkedContact",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    primaryContactId: {
      type: Sequelize.DataTypes.INTEGER,
    },
    secondaryContactIds: {
      type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    paranoid: true,
    deletedAt: true,
  }, {
    indexes: {}
  }
);

// LinkedContact.sync({ alter: true })
//   .then(() => {
//     console.log("Table and Model LinkedContact synced successfully.");
//   })
//   .catch((error) => console.error(error));

module.exports = LinkedContact;
