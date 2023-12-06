import Joi from "joi";

const SHORTSTR = Joi.string();
const SHORTSTRREQUIRED = Joi.string().max(200).required();
const LONGSTR = Joi.string().max(5000);
const LONGSTRRERQUIRED = Joi.string().max(5000).required();
const SMNUMBERREQUIRED = Joi.number().required();
const SMNUMBER = Joi.number();

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
      phone: Joi.string().allow(""),
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
  schemaObj = {
    thumbnail: LONGSTRRERQUIRED,
    name: SHORTSTRREQUIRED,
    author: SHORTSTRREQUIRED,
    publishYear: SMNUMBERREQUIRED,
    isbn: SHORTSTR,
    description: LONGSTRRERQUIRED,
  };

  validationProcessor(schemaObj, req, res, next);

  //I am gettign value or error or both from Joi
  //joi will validate req.body
};
