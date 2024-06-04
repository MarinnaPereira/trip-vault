import { Router } from 'express';

import { validateId } from '../middlewares/validateId.js';
import verifyToken from '../middlewares/verifyToken.js';
import { validateTrip } from '../middlewares/validateTrip.js';
import {
  getAllTrips,
  addTrip,
  getTrip,
  updateTrip,
  deleteTrip,
} from '../controllers/tripsController.js';

export const tripsRouter = Router();

tripsRouter
  .route('/')
  .get(verifyToken, getAllTrips)
  .post(verifyToken, validateTrip, addTrip);

tripsRouter
  .route('/:id')
  .get(validateId, verifyToken, getTrip)
  .patch(validateId, verifyToken, validateTrip, updateTrip)
  .delete(validateId, verifyToken, deleteTrip);
