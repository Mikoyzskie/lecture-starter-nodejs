import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get(
  "/",
  (req, res, next) => {
    try {
      res.data = fighterService.getAllFighters();
    } catch (err) {
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
      res.data = fighterService.getOneFighter({ id });
      res.status(200);
    } catch (err) {
      res.err = err;
      res.status(404);
    } finally {
      return next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    const { name, power, defense } = req.body;

    try {
      res.data = fighterService.createFighter({
        name,
        power,
        defense,
        health: 100,
      });
      res.status(201);
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
  updateFighterValid,
  (req, res, next) => {
    const { id } = req.params;

    try {
      res.data = fighterService.updateFighter(id, req.body);
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
      const fighter = fighterService.getOneFighter({ id });
      if (id !== fighter?.id) {
        throw new Error(`Fighter with id ${id} does not exist`);
      }

      res.data = fighterService.deleteFighter(id);
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
