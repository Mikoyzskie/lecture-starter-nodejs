import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const { name } = req.body;

  try {
    const fighter = fighterService.getOneFighter({ name });
    if (name === fighter?.name) {
      throw new Error(`Fighter already exists`);
    }

    if (Object.keys(req.body).length !== Object.keys(FIGHTER).length - 1) {
      throw new Error("Invalid number of fields.");
    }
    const requestedKeys = Object.keys(req.body);
    const initialKeys = Object.keys(FIGHTER);

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

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const { id } = req.params;

  try {
    const fighter = fighterService.getOneFighter({ id });
    if (id !== fighter?.id) {
      throw new Error(`This fighter id ${id} was not found.`);
    }

    if (!Object.keys(req.body).length) {
      throw new Error("No fields to update.");
    }

    const requestedKeys = Object.keys(req.body);
    const initialKeys = Object.keys(FIGHTER);

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

const isValid = (body) => {
  if (body.name) {
    validateName(body.name);
  }
  if (body.power) {
    validatePower(body.power);
  }
  if (body.defense) {
    validateDefense(body.defense);
  }
};

const validateName = (name) => {
  if (!name || !name.match(/^[a-zA-Z]+$/)) {
    throw new Error("Invalid fighter name or empty field.");
  }
};

const validatePower = (power) => {
  if (
    !power ||
    isNaN(Number(power)) ||
    Number(power) < 0 ||
    Number(power) > 100
  ) {
    throw new Error("Power must be in the range 0 - 100.");
  }
};

const validateDefense = (defense) => {
  if (
    !defense ||
    isNaN(Number(defense)) ||
    Number(defense) < 1 ||
    Number(defense) > 10
  ) {
    throw new Error("Defence must be in the range 1 - 10.");
  }
};

export { createFighterValid, updateFighterValid };
