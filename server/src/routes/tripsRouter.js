import { Router } from 'express';

import {
  getAllTrips,
  addTrip,
  getTrip,
  updateTrip,
  deleteTrip,
} from '../controllers/tripsController.js';
import { validateTrip } from '../middlewares/validateTrip.js';
import { validateId } from '../middlewares/validateId.js';
import verifyToken from '../middlewares/verifyToken.js';
import { sanitizeTripToUpdate } from '../middlewares/sanitizeTripToUpdate.js';

export const tripsRouter = Router();

tripsRouter
  .route('/')
  .get(verifyToken, getAllTrips)
  .post(verifyToken, validateTrip, addTrip);

tripsRouter
  .route('/:id')
  .get(validateId, verifyToken, getTrip)
  .patch(
    validateId,
    verifyToken,
    sanitizeTripToUpdate,
    validateTrip,
    updateTrip,
  )
  .delete(validateId, verifyToken, deleteTrip);
