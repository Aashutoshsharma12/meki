import { Router } from 'express';
import addressRoute from './address';
import homeRoute from './home';
import ratingRoute from './rating';
import favRoute from './fav_vendor';
import orderRoute from './order';
import faqRoute from './faq';
import report_issueRoute from './report_issue';
import feedbackRoute from './feedback';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/address', addressRoute);
baseRouter.use('/home', homeRoute);
baseRouter.use('/rating',ratingRoute);
baseRouter.use('/fav',favRoute);
baseRouter.use('/order',orderRoute);
baseRouter.use('/faq',faqRoute);
baseRouter.use('/report_issue',report_issueRoute);
baseRouter.use('/feedback',feedbackRoute);

// Export default.
export default baseRouter;