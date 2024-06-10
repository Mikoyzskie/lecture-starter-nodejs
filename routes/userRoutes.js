import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.get(
  "/",
  (req, res, next) => {
    try {
      const users = userService.getUsers();

      res.send(users);
    } catch (error) {
      res.err = err;
      res.status(404);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    const { id } = req.params;

    try {
      res.data = userService.search({ id });

      if (!res.data) {
        res.status(404);
        throw new Error("user not found");
      }

      res.status(200);
    } catch (err) {
      res.err = err;
      res.status(404);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    try {
      res.data = userService.createUser({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });
      res.status(200);
    } catch (err) {
      res.err = err;
      res.status(400);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    const { id } = req.params;

    const user = userService.search({ id });

    if (!user) {
      res.status(404);
      throw new Error("user not found");
    }

    try {
      res.data = userService.updateUser(id, req.body);

      res.status(200);
    } catch (err) {
      res.err = err;
      res.status(400);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    const { id } = req.params;

    try {
      const user = userService.search({ id });
      if (id !== user?.id) {
        throw new Error(`User does not exist.`);
      }

      res.data = userService.deleteUser(id);
      res.status(200);
    } catch (err) {
      res.err = err;
      res.status(400);
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
