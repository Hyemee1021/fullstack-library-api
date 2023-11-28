import Joi from "joi";

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
