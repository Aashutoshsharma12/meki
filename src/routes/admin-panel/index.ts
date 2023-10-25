import { Router } from 'express';
import { Request, Response } from 'express';
import path from 'path';
const viewsDir = path.join(__dirname, '../../public/admin/views');

const baseRouter = Router();

/***********************************************************************************
 *                                  Front-end routes
 **********************************************************************************/
baseRouter.get('/', (_: Request, res: Response) => {
    res.redirect('/admin/login')
});

//***********Login Page*************//
baseRouter.get('/login', (_: Request, res: Response) => {
    res.sendFile('auth/login.html', { root: viewsDir });
});

//*********Dashboard Page***************//

baseRouter.get('/dashboard', (_: Request, res: Response) => {
    res.sendFile('dashboard.html', { root: viewsDir });
});

/****** Category Page */
baseRouter.get('/category', (_: Request, res: Response) => {
    res.sendFile('listing/categoryList.html', { root: viewsDir });
});
//***********UserListing Page*************//
baseRouter.get('/user', (_: Request, res: Response) => {
    res.sendFile('listing/userlisting.html', {root: viewsDir});
});
//***********UserView Page*************//
baseRouter.get('/userView', (_: Request, res: Response) => {
    res.sendFile('listing/userView.html', {root: viewsDir});
});
//***********Explore Page*************//
baseRouter.get('/explore', (_: Request, res: Response) => {
    res.sendFile('listing/explore.html', {root: viewsDir});
});

//***********Restaurant Page*************//
baseRouter.get('/restaurant', (_: Request, res: Response) => {
    res.sendFile('listing/restaurant.html', {root: viewsDir});
});
//***********Add Restaurant*************//
baseRouter.get('/addRestaurant', (_: Request, res: Response) => {
    res.sendFile('add/addRestaurant.html', {root: viewsDir});
});
//***********Restaurant view*************//
baseRouter.get('/restaurantView', (_: Request, res: Response) => {
    res.sendFile('edit/restaurantDetails.html', {root: viewsDir});
});
//***********Restaurant view*************//
baseRouter.get('/editRestaurant', (_: Request, res: Response) => {
    res.sendFile('edit/editRestaurant.html', {root: viewsDir});
});
//***********Branch list*************//
baseRouter.get('/branchList', (_: Request, res: Response) => {
    res.sendFile('listing/branches.html', {root: viewsDir});
});
//***********Branch edit*************//
baseRouter.get('/editBranch', (_: Request, res: Response) => {
    res.sendFile('edit/editBranch.html', {root: viewsDir});
});
//***********Branch add*************//
baseRouter.get('/addBranch', (_: Request, res: Response) => {
    res.sendFile('add/addBranch.html', {root: viewsDir});
});
//***********Edit item category*************//
baseRouter.get('/edit_ItemCat', (_: Request, res: Response) => {
    res.sendFile('edit/edit_ItemCategory.html', {root: viewsDir});
});

//***********Add item category*************//
baseRouter.get('/add_ItemCat', (_: Request, res: Response) => {
    res.sendFile('add/add_ItemCategory.html', {root: viewsDir});
});

//***********List item category*************//
baseRouter.get('/list_ItemCat', (_: Request, res: Response) => {
    res.sendFile('listing/item_category.html', {root: viewsDir});
});
/***********Add menu item *************/
baseRouter.get('/addMenuItem', (_: Request, res: Response) => {
    res.sendFile('add/addMenuItem.html', {root: viewsDir});
});
/***********Edit menu item *************/
baseRouter.get('/editMenuItem', (_: Request, res: Response) => {
    res.sendFile('edit/editMenuItem.html', {root: viewsDir});
});

/***********Addons Category list *************/
baseRouter.get('/addonsCatList', (_: Request, res: Response) => {
    res.sendFile('listing/addonsCatList.html', {root: viewsDir});
});
/***********Add addons  Category*************/
baseRouter.get('/addAddons_Cat', (_: Request, res: Response) => {
    res.sendFile('add/addAddons_Cat.html', {root: viewsDir});
});
/***********Edit addons Category *************/
baseRouter.get('/editAddons_Cat', (_: Request, res: Response) => {
    res.sendFile('edit/editAddons_Cat.html', {root: viewsDir});
});

/***********Add addons *************/
baseRouter.get('/addAddons', (_: Request, res: Response) => {
    res.sendFile('add/addAddons.html', {root: viewsDir});
});
/***********Edit addons *************/
baseRouter.get('/editAddons', (_: Request, res: Response) => {
    res.sendFile('edit/editAddons.html', {root: viewsDir});
});

/***********Item Size list *************/
baseRouter.get('/sizeList', (_: Request, res: Response) => {
    res.sendFile('listing/itemSize.html', {root: viewsDir});
});

/***********Delivery Person list *************/
baseRouter.get('/deliveryPersonList', (_: Request, res: Response) => {
    res.sendFile('listing/deliveryPerson.html', {root: viewsDir});
});

/***********Add Delivery Person  *************/
baseRouter.get('/addDeliveryPerson', (_: Request, res: Response) => {
    res.sendFile('add/addDeliveryPerson.html', {root: viewsDir});
});

/***********Edit Delivery Person  *************/
baseRouter.get('/editDeliveryPerson', (_: Request, res: Response) => {
    res.sendFile('edit/editDeliveryPerson.html', {root: viewsDir});
});

/*********** Delivery Person Details *************/
baseRouter.get('/deliveryPersonDetails', (_: Request, res: Response) => {
    res.sendFile('edit/deliveryPersonDetails.html', {root: viewsDir});
});

//***********VendorListing Page*************//
baseRouter.get('/vendor', (_: Request, res: Response) => {
    res.sendFile('listing/vendor.html', {root: viewsDir});
});
//***********vendor Details Page*************//
baseRouter.get('/vendorDetails', (_: Request, res: Response) => {
    res.sendFile('listing/vendorDetails.html', {root: viewsDir});
});
//***********Update vendor profile*************//
baseRouter.get('/update_vendorProfile', (_: Request, res: Response) => {
    res.sendFile('edit/update_vendorProfile.html', {root: viewsDir});
});

//***********Faq list*************//
baseRouter.get('/faq', (_: Request, res: Response) => {
    res.sendFile('listing/faq.html', {root: viewsDir});
});

//***********Cancel Reason list*************//
baseRouter.get('/cancel_reason', (_: Request, res: Response) => {
    res.sendFile('listing/cancelReason.html', {root: viewsDir});
});

//***********Notification list*************//
baseRouter.get('/notificationList', (_: Request, res: Response) => {
    res.sendFile('listing/notification.html', {root: viewsDir});
});
//***********Send Notification*************//
baseRouter.get('/sendNotification', (_: Request, res: Response) => {
    res.sendFile('add/sendNotification.html', {root: viewsDir});
});



export default baseRouter;