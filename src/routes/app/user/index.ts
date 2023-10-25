import { Router } from 'express';
import addressRoute from './address';
import homeRoute from './home';
import ratingRoute from './rating';
import favRoute from './fav_vendor';
import orderRoute from './order';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/address', addressRoute);
baseRouter.use('/home', homeRoute);
baseRouter.use('/rating',ratingRoute);
baseRouter.use('/fav',favRoute);
baseRouter.use('/order',orderRoute);


// Export default.
export default baseRouter;