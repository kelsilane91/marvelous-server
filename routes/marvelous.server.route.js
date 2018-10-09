// import package dependencies
import express from 'express';

// import controller file
import * as marvelousController from '../controllers/marvelous.server.controller';

// get an instance of express router
const router = express.Router();

router.route('/')
    .get(marvelousController.getHeroes)
    .post(marvelousController.addHero)
    .put(marvelousController.updateHero);

router.route('/:id')
    .get(marvelousController.getHero)
    .delete(marvelousController.deleteHero);

export default router;