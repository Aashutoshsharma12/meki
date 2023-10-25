import { Router } from 'express';
import authRoute from './auth';
import faqRoute from './faq';
import notificationRoute from './notification';

// Export the base-router

const baseRouter = Router();

// Setup routers
baseRouter.use('/auth', authRoute);
baseRouter.use('/faq', faqRoute);
baseRouter.use('/notification', notificationRoute);

// Export default.
export default baseRouter;