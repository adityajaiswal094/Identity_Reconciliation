const Contact = require("./ContactModel");

const getByPhoneNumber = {
  findAll: async (phoneNumber) => {
    try {
      return await Contact.findAll({
        where: {
          phoneNumber: phoneNumber,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  findOne: async (phoneNumber) => {
    try {
      return await Contact.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};

const getByEmail = {
  findAll: async (email) => {
    try {
      return await Contact.findAll({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  findOne: async (email) => {
    try {
      return await Contact.findOne({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};

const getBylinkPrecedence = {
  findAll: async (linkPrecedence) => {
    try {
      return await Contact.findAll({
        where: {
          linkPrecedence: linkPrecedence,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  findOne: async (linkPrecedence) => {
    try {
      return await Contact.findOne({
        where: {
          linkPrecedence: linkPrecedence,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};

const createNewContact = async (
  phoneNumber = "",
  email = "",
  linkedId = null,
  linkPrecedence = "primary"
) => {
  try {
    return await Contact.create(
      {
        email: email,
        phoneNumber: phoneNumber,
        linkedId: linkedId,
        linkPrecedence: linkPrecedence,
      },
    );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getByEmail,
  getByPhoneNumber,
  getBylinkPrecedence,
  createNewContact,
};
