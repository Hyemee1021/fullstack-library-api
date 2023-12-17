import Joi from "joi";

const SHORTSTR = Joi.string();
const SHORTSTRREQUIRED = Joi.string().max(200).required();
const LONGSTR = Joi.string().max(50000);
const LONGSTRRERQUIRED = Joi.string().max(50000).required();
const NUMBERREQUIRED = Joi.number().required();
const NUMBER = Joi.number();

//======book validation
const validationProcessor = ({ schemaObj, req, res, next }) => {
  try {
    //what are you validating?

    const schema = Joi.object(schemaObj);

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
    //I am gettign value or error or both from Joi
    //joi will validate req.body

    next();
  } catch (error) {
    console.log(error);
  }
};

// middleware - have power recieve and get msg to client //receivews req, res,next
export const newUserValidation = (req, res, next) => {
  try {
    //what are you validating?

    const schema = Joi.object({
      fName: Joi.string().required(),
      lName: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().allow("", null),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
    //I am gettign value or error or both from Joi
    //joi will validate req.body

    next();
  } catch (error) {
    console.log(error);
  }
};

export const loginValidation = (req, res, next) => {
  try {
    //what are you validating?

    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),

      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.json({
        status: "error",
        message: error.message,
      });
    }
    //I am gettign value or error or both from Joi
    //joi will validate req.body

    next();
  } catch (error) {
    console.log(error);
  }
};

//===================books

export const newBookValidation = (req, res, next) => {
  const schemaObj = {
    thumbnail: LONGSTR,
    name: SHORTSTRREQUIRED,
    author: SHORTSTRREQUIRED,
    publishYear: NUMBERREQUIRED,
    isbn: SHORTSTRREQUIRED,
    description: LONGSTR,
  };

  validationProcessor({ schemaObj, req, res, next });

  //I am gettign value or error or both from Joi
  //joi will validate req.body
};
export const updateBookValidation = (req, res, next) => {
  const schemaObj = {
    status: SHORTSTRREQUIRED,
    _id: SHORTSTRREQUIRED,
    thumbnail: LONGSTR,
    name: SHORTSTRREQUIRED,
    author: SHORTSTRREQUIRED,
    publishYear: NUMBERREQUIRED,

    description: LONGSTR,
  };

  validationProcessor({ schemaObj, req, res, next });

  //I am gettign value or error or both from Joi
  //joi will validate req.body
};

//=======================burrow

export const newBurrowValidation = (req, res, next) => {
  const schemaObj = {
    bookId: SHORTSTRREQUIRED,
    bookName: SHORTSTRREQUIRED,
    thumbnail: LONGSTR,
    userId: SHORTSTRREQUIRED,
    userName: SHORTSTRREQUIRED,
  };

  validationProcessor({ schemaObj, req, res, next });

  //I am gettign value or error or both from Joi
  //joi will validate req.body
};
