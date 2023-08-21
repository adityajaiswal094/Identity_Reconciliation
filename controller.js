const express = require("express");
const {Op} = require("sequelize");
const db = require("./database/databaseConnection");
const Contact = require("./database/ContactModel");

const identifyContact = async (req, res) => {
  try {
    const resObj = {
        contact: {
            primaryContactId: '',
            emails: [],
            phoneNumbers: [],
            secondaryContactIds: [],
        },
    };

    const body = req.body;
    console.log(body);
    
    const fetchContacts = await Contact.findAll({
        where: {
            [Op.or]: [
                {email: body.email ? body.email : null},
                {phoneNumber: body.phoneNumber ? body.phoneNumber : null}
            ],
        }
    });

    if(fetchContacts.length === 0) {
        await Contact.create(body);
    } else {
        await Contact.create({
            ...body,
            linkedId: fetchContacts[0].id,
            linkPrecedence: "secondary",
        });
    }
        
    res.status(200).json({fetchContacts});
  } catch (error) {
    console.error(error);
  }

  // res.status(200).json({
  // 	"contact":{
  // 		"primaryContatctId": 1,
  // 		"emails": [body.email], // first element being email of primary contact
  // 		"phoneNumbers": [body.phoneNumber], // first element being phoneNumber of primary contact
  // 		"secondaryContactIds": [23] // Array of all Contact IDs that are "secondary" to the primary contact
  // 	}
  // });
};

module.exports = identifyContact;
