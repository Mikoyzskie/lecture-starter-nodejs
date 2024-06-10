import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { email, phoneNumber } = req.body;

  try {
    const userEmail = userService.search({ email });
    const userPhoneNumber = userService.search({ phoneNumber });
    if (userEmail || userPhoneNumber) {
      res.status(400);
      throw new Error(`This user with an email or phone number already exist.`);
    }

    if (Object.keys(req.body).length !== Object.keys(USER).length - 1) {
      throw new Error("Invalid number of fields.");
    }
    const requestedKeys = Object.keys(req.body);
    const initialKeys = Object.keys(USER);

    for (let i = 0; i < requestedKeys.length; i++) {
      if (!initialKeys.includes(requestedKeys[i])) {
        throw new Error(`Invalid field ${requestedKeys[i]}.`);
      }
      if (!req.body[requestedKeys[i]]) {
        throw new Error(`Empty field ${requestedKeys[i]}.`);
      }
    }

    isValid(req.body);
    res.data = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send(err.message);
    res.err = err;
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const { id } = req.params;

  try {
    const user = userService.search({ id });
    if (!user) {
      res.status(404).send("User does not exist.");
    }

    if (!Object.keys(req.body).length) {
      throw new Error("No fields to update.");
    }

    const userFound = userService.search(req.body.email);
    if (!userFound) {
      throw new Error(`User already exists`);
    }

    const requestedKeys = Object.keys(req.body);
    const initialKeys = Object.keys(USER);

    for (let i = 0; i < requestedKeys.length; i++) {
      if (!initialKeys.includes(requestedKeys[i])) {
        throw new Error(`Invalid field ${requestedKeys[i]}.`);
      }
      if (!req.body[requestedKeys[i]]) {
        throw new Error(`Empty field ${requestedKeys[i]}.`);
      }
    }

    isValid(req.body);
    res.status(200);
    res.data = { ...req.body };
    next();
  } catch (err) {
    res.status(400).send(err.message);
    res.err = err;
  }
};

const isValid = (body) => {
  if (body.email) {
    validateEmail(body.email);
  }
  if (body.phoneNumber) {
    validatePhone(body.phoneNumber);
  }
  if (body.firstName) {
    validateName(body.firstName);
  }
  if (body.lastName) {
    validateName(body.lastName);
  }
  if (body.password) {
    validatePassword(body.password);
  }
};

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new Error("Invalid email");
  }
};

const validatePassword = (password) => {
  if (password.length < 3) {
    throw new Error("There must be at least 3 characters in the password.");
  }
};

const validatePhone = (phone) => {
  if (!phone || !phone.match(/\+380\d{9}/g)) {
    throw new Error(
      "Invalid phone number, enter the number in this format +380xxxxxxxxx."
    );
  }
};

const validateName = (name) => {
  if (!name || !name.match(/^[a-zA-Z]+$/)) {
    throw new Error("Invalid first or last name.");
  }
};

export { createUserValid, updateUserValid };
