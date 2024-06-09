import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  getAllFighters() {
    const fighters = fighterRepository.getAll();
    if (fighters.length === 0) {
      return [];
    }
    return fighters;
  }

  getOneFighter(search) {
    const fighter = fighterRepository.getOne(search);
    if (!fighter) {
      return null;
    }
    return fighter;
  }

  createFighter(body) {
    const fighter = fighterRepository.create(body);
    if (!fighter) {
      return null;
    }
    return fighter;
  }

  updateFighter(id, body) {
    const fighter = fighterRepository.update(id, body);
    if (!fighter) {
      return null;
    }
    return fighter;
  }

  deleteFighter(id) {
    const fighter = fighterRepository.delete(id);
    if (!fighter) {
      return null;
    }
    return fighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
