const express = require("express");
const { Op } = require("sequelize");
const db = require("./database/databaseConnection");
const Contact = require("./database/ContactModel");
const LinkedContact = require("./database/LinkedContactModel");
const {
  getByPhoneNumber,
  createNewContact,
  getByEmail,
} = require("./database/databaseActions");

const identifyContact = async (req, res) => {
  try {
    const linkedContact = {
      primaryContactId: "",
      emails: [],
      phoneNumbers: [],
      secondaryContactIds: [],
    };

    let fetchContacts;

    const body = req.body;

		// console.log(email, phoneNumber);

    if (body.phoneNumber !== "") {
      fetchContacts = await getByPhoneNumber.findAll(body.phoneNumber);

			console.log(fetchContacts);

      // if (fetchContacts.length !== 0) {
      //   createNewContact({
      //     email: email,
      //     phoneNumber: phoneNumber,
      //     linkedId: fetchContacts[0].id,
      //     linkPrecedence: "secondary",
      //   });
      // } else {
        await createNewContact({
          email: body.email,
          phoneNumber: body.phoneNumber,
        });
      // }

    //   fetchContacts = getByPhoneNumber.findAll(phoneNumber);
    }
		//  else {
    //   fetchContacts = getByEmail.findAll(email);

    //   if (fetchContacts.length !== 0) {
    //     createNewContact({
    //       email: email,
    //       phoneNumber: phoneNumber,
    //       linkedId: fetchContacts[0].id,
    //       linkPrecedence: "secondary",
    //     });
    //   } else {
    //     createNewContact({
    //       email: email,
    //       phoneNumber: phoneNumber,
    //     });
    //   }

    //   fetchContacts = getByEmail.findAll(email);
    // }

    // fetchContacts.forEach((contact) => {
    //   if (fetchContacts.linkPrecedence === "primary") {
    //     linkedContact.primaryContactId = fetchContacts.id;
    //   } else if (fetchContacts.linkPrecedence === "secondary") {
    //     linkedContact.secondaryContactIds.push(fetchContacts.id);
    //   }

    //   linkedContact.emails.push(fetchContacts.email);
    //   linkedContact.phoneNumbers.push(fetchContacts.phoneNumber);
    // });

		res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error: ${error}` });
  }
};

module.exports = identifyContact;
