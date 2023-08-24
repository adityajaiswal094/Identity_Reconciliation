const express = require("express");
const { Op } = require("sequelize");
const db = require("./database/databaseConnection");
const Contact = require("./database/ContactModel");
const LinkedContact = require("./database/LinkedContactModel");

function addElements(arr, phnOrEmail) {
  if (arr.indexOf(phnOrEmail) === -1) {
    arr.push(phnOrEmail);
  }
}

const identifyContact = async (req, res) => {
  try {
    const resObj = {
      contact: {
        primaryContactId: "",
        emails: [],
        phoneNumbers: [],
        secondaryContactIds: [],
      },
    };

    const body = req.body;
    console.log(body);

    // check 0: if both not null, and unique => create new, not unique => link with primary
    if (body.email !== null && body.phoneNumber !== null) {
      const fetchPrimaryContact = await Contact.findAll({
        where: {
          [Op.or]: [{ email: body.email }, { phoneNumber: body.phoneNumber }],
        },
      });

      if (fetchPrimaryContact.length !== 0) {
        await Contact.create({
          email: body.email,
          phoneNumber: body.phoneNumber,
          linkedId: fetchPrimaryContact[0].id,
          linkPrecedence: "secondary",
        });

        const fetchContact = await Contact.findOne({
          where: {
            [Op.and]: [
              { email: body.email },
              { phoneNumber: body.phoneNumber },
            ],
          },
        });

				// console.log(fetchContact.email, fetchContact.phoneNumber);
				// res.status(200).json({fetchContact});
				// return;


        // await LinkedContact.create({
        // 	primaryContactId: fetchContact.id,
        // 	emails: [fetchContact.email],
        // 	phoneNumbers: [fetchContact.phoneNumber],
        // });


        await LinkedContact.update(
          {
            emails: db.literal(
              `array_append("emails", '${fetchContact.email}')`
            ),
            phoneNumbers: db.literal(
              `array_append("phoneNumbers", '${fetchContact.phoneNumber}')`
            ),
            secondaryContactIds: db.literal(
              `array_append("secondaryContactIds", '${fetchContact.id}')`
            ),
          },
          {
            where: {
              primaryContactId: fetchPrimaryContact[0].id,
            },
          }
        );
      }

      const fetchResObject = await LinkedContact.findOne({
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        where: {
          emails: {
            [Op.overlap]: [body.email],
          },
        },
      });

      res.status(200).json({ fetchResObject });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error: ${error}` });
  }
};

module.exports = identifyContact;
