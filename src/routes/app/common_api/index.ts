import { Router } from 'express';
import authRoute from './auth';
import faqRoute from './faq';
import notificationRoute from './notification';
import supportRoute from './support';

// Export the base-router

const baseRouter = Router();

// Setup routers
baseRouter.use('/auth', authRoute);
baseRouter.use('/faq', faqRoute);
baseRouter.use('/notification', notificationRoute);
baseRouter.use('/support', supportRoute);

// Export default.
export default baseRouter;