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

export const tripsRouter = Router();

tripsRouter.route('/').get(getAllTrips).post(validateTrip, addTrip);

tripsRouter
  .route('/:id')
  .get(validateId, getTrip)
  .patch(validateId, validateTrip, updateTrip)
  .delete(validateId, deleteTrip);
