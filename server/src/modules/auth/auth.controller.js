const { findByEmail, registerCustomer } = require("./auth.repository");
const bcrypt = require("bcrypt");
const { clearStr } = require("../../../utils/utils");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegisterBody({ firstname, lastname, email, password }) {
  if (!firstname) {
    return "First name is required.";
  }
  if (!lastname) {
    return "Last name is required.";
  }
  if (!email) {
    return "Email is required.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  return null;
}

async function register(req, res, next) {
  try {
    const firstname = clearStr(req.body.firstname);
    const lastname = clearStr(req.body.lastname);
    const email = clearStr(req.body.email);
    const password = req.body.password;

    const validationError = validateRegisterBody({
      firstname,
      lastname,
      email,
      password,
    });

    if (validationError) {
      return res.status(400).json({
        message: validationError,
        status: "error",
      });
    }

    const existingCustomer = await findByEmail(email);
    if (existingCustomer) {
      return res.status(409).json({
        message: "Customer already exists",
        status: "error",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await registerCustomer({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Customer registered successfully",
      status: "success",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register };
