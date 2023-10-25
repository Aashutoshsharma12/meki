import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import categoryRouter from './category'
import restaurantRouter from './restaurant'
import exploreRouter from './explore'
import item_category from './item_category';
import menu_item from './item';
import addons_cat from './addons_cat';
import addons from './addons';
import itemSize from './itemSize';
import deliveryPersion from './deliveryPerson'
import order from './order'
import cancelReason from './cancelReason';

// Export the base-router
const adminbaseRouter = Router();

// Setup routers
adminbaseRouter.use('/auth', authRouter);
adminbaseRouter.use('/user', userRouter);
adminbaseRouter.use('/category', categoryRouter);
adminbaseRouter.use('/restaurant', restaurantRouter);
adminbaseRouter.use('/explore', exploreRouter);
adminbaseRouter.use('/item_category', item_category);
adminbaseRouter.use('/menuItem', menu_item);
adminbaseRouter.use('/addons_cat', addons_cat);
adminbaseRouter.use('/addons', addons);
adminbaseRouter.use('/itemSize', itemSize);
adminbaseRouter.use('/deliveryPerson', deliveryPersion);
adminbaseRouter.use('/order', order);
adminbaseRouter.use('/cancelReason',cancelReason);
// Export default.
export default adminbaseRouter;