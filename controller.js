import express from "express";
export const identifyContact = async (req, res) => {
    const body = req.body;
    console.log(body);
    res.status(200).json({
		"contact":{
			"primaryContatctId": 1,
			"emails": [body.email], // first element being email of primary contact 
			"phoneNumbers": [body.phoneNumber], // first element being phoneNumber of primary contact
			"secondaryContactIds": [23] // Array of all Contact IDs that are "secondary" to the primary contact
		}
	});
};