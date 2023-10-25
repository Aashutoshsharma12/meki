import { Router } from 'express';
import categoryRoute from './category';
import item_category from './item_category';
import addOns_category from './addOns_category';
import addOns from './addOns';
import menu_size from './menu_size';
import item from './item';
import open_close from './open_closing';
import offer from './offers';
import branch from './branch';
import delivery from './deliveryPerson';
import deliveryPerson_order from './deliveryPerson_order';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/category', categoryRoute);
baseRouter.use('/item_category',item_category);
baseRouter.use('/addOns_category',addOns_category);
baseRouter.use('/addOns',addOns);
baseRouter.use('/menu_size',menu_size);
baseRouter.use('/item',item);
baseRouter.use('/openClose',open_close);
baseRouter.use('/offer',offer);
baseRouter.use('/branch',branch);
baseRouter.use('/delivery',delivery);
baseRouter.use('/dpOrder',deliveryPerson_order);

// Export default.
export default baseRouter;