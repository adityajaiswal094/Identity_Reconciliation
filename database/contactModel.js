import { Sequelize } from "sequelize";

module.exports = (sequelize, DataTypes) => {
    const contact = sequelize.define(
        "Contacts",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            phoneNumber: DataTypes.TEXT,
            email: DataTypes.TEXT,
            linkedId: DataTypes.INTEGER,
            linkPrecedence: DataTypes.TEXT,
        },
        {
            deletedAt: DataTypes.DATE,
        }
    );

    return contact;
};