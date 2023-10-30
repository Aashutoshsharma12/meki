"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const viewsDir = path_1.default.join(__dirname, '../../public/admin/views');
const baseRouter = (0, express_1.Router)();
/***********************************************************************************
 *                                  Front-end routes
 **********************************************************************************/
baseRouter.get('/', (_, res) => {
    res.redirect('/admin/login');
});
//***********Login Page*************//
baseRouter.get('/login', (_, res) => {
    res.sendFile('auth/login.html', { root: viewsDir });
});
//*********Dashboard Page***************//
baseRouter.get('/dashboard', (_, res) => {
    res.sendFile('dashboard.html', { root: viewsDir });
});
/****** Category Page */
baseRouter.get('/category', (_, res) => {
    res.sendFile('listing/categoryList.html', { root: viewsDir });
});
//***********UserListing Page*************//
baseRouter.get('/user', (_, res) => {
    res.sendFile('listing/userlisting.html', { root: viewsDir });
});
//***********UserView Page*************//
baseRouter.get('/userView', (_, res) => {
    res.sendFile('listing/userView.html', { root: viewsDir });
});
//***********Explore Page*************//
baseRouter.get('/explore', (_, res) => {
    res.sendFile('listing/explore.html', { root: viewsDir });
});
//***********Restaurant Page*************//
baseRouter.get('/restaurant', (_, res) => {
    res.sendFile('listing/restaurant.html', { root: viewsDir });
});
//***********Add Restaurant*************//
baseRouter.get('/addRestaurant', (_, res) => {
    res.sendFile('add/addRestaurant.html', { root: viewsDir });
});
//***********Restaurant view*************//
baseRouter.get('/restaurantView', (_, res) => {
    res.sendFile('edit/restaurantDetails.html', { root: viewsDir });
});
//***********Restaurant view*************//
baseRouter.get('/editRestaurant', (_, res) => {
    res.sendFile('edit/editRestaurant.html', { root: viewsDir });
});
//***********Branch list*************//
baseRouter.get('/branchList', (_, res) => {
    res.sendFile('listing/branches.html', { root: viewsDir });
});
//***********Branch edit*************//
baseRouter.get('/editBranch', (_, res) => {
    res.sendFile('edit/editBranch.html', { root: viewsDir });
});
//***********Branch add*************//
baseRouter.get('/addBranch', (_, res) => {
    res.sendFile('add/addBranch.html', { root: viewsDir });
});
//***********Edit item category*************//
baseRouter.get('/edit_ItemCat', (_, res) => {
    res.sendFile('edit/edit_ItemCategory.html', { root: viewsDir });
});
//***********Add item category*************//
baseRouter.get('/add_ItemCat', (_, res) => {
    res.sendFile('add/add_ItemCategory.html', { root: viewsDir });
});
//***********List item category*************//
baseRouter.get('/list_ItemCat', (_, res) => {
    res.sendFile('listing/item_category.html', { root: viewsDir });
});
/***********Add menu item *************/
baseRouter.get('/addMenuItem', (_, res) => {
    res.sendFile('add/addMenuItem.html', { root: viewsDir });
});
/***********Edit menu item *************/
baseRouter.get('/editMenuItem', (_, res) => {
    res.sendFile('edit/editMenuItem.html', { root: viewsDir });
});
/***********Addons Category list *************/
baseRouter.get('/addonsCatList', (_, res) => {
    res.sendFile('listing/addonsCatList.html', { root: viewsDir });
});
/***********Add addons  Category*************/
baseRouter.get('/addAddons_Cat', (_, res) => {
    res.sendFile('add/addAddons_Cat.html', { root: viewsDir });
});
/***********Edit addons Category *************/
baseRouter.get('/editAddons_Cat', (_, res) => {
    res.sendFile('edit/editAddons_Cat.html', { root: viewsDir });
});
/***********Add addons *************/
baseRouter.get('/addAddons', (_, res) => {
    res.sendFile('add/addAddons.html', { root: viewsDir });
});
/***********Edit addons *************/
baseRouter.get('/editAddons', (_, res) => {
    res.sendFile('edit/editAddons.html', { root: viewsDir });
});
/***********Item Size list *************/
baseRouter.get('/sizeList', (_, res) => {
    res.sendFile('listing/itemSize.html', { root: viewsDir });
});
/***********Delivery Person list *************/
baseRouter.get('/deliveryPersonList', (_, res) => {
    res.sendFile('listing/deliveryPerson.html', { root: viewsDir });
});
/***********Add Delivery Person  *************/
baseRouter.get('/addDeliveryPerson', (_, res) => {
    res.sendFile('add/addDeliveryPerson.html', { root: viewsDir });
});
/***********Edit Delivery Person  *************/
baseRouter.get('/editDeliveryPerson', (_, res) => {
    res.sendFile('edit/editDeliveryPerson.html', { root: viewsDir });
});
/*********** Delivery Person Details *************/
baseRouter.get('/deliveryPersonDetails', (_, res) => {
    res.sendFile('edit/deliveryPersonDetails.html', { root: viewsDir });
});
//***********VendorListing Page*************//
baseRouter.get('/vendor', (_, res) => {
    res.sendFile('listing/vendor.html', { root: viewsDir });
});
//***********vendor Details Page*************//
baseRouter.get('/vendorDetails', (_, res) => {
    res.sendFile('listing/vendorDetails.html', { root: viewsDir });
});
//***********Update vendor profile*************//
baseRouter.get('/update_vendorProfile', (_, res) => {
    res.sendFile('edit/update_vendorProfile.html', { root: viewsDir });
});
//***********Faq list*************//
baseRouter.get('/faq', (_, res) => {
    res.sendFile('listing/faq.html', { root: viewsDir });
});
//***********Cancel Reason list*************//
baseRouter.get('/cancel_reason', (_, res) => {
    res.sendFile('listing/cancelReason.html', { root: viewsDir });
});
//***********Notification list*************//
baseRouter.get('/notificationList', (_, res) => {
    res.sendFile('listing/notification.html', { root: viewsDir });
});
//***********Send Notification*************//
baseRouter.get('/sendNotification', (_, res) => {
    res.sendFile('add/sendNotification.html', { root: viewsDir });
});
//***********Support list*************//
baseRouter.get('/support', (_, res) => {
    res.sendFile('listing/support.html', { root: viewsDir });
});
//***********Faq Category list*************//
baseRouter.get('/faqCategory', (_, res) => {
    res.sendFile('listing/faqCategory.html', { root: viewsDir });
});
//***********Chat page*************//
baseRouter.get('/chating', (_, res) => {
    res.sendFile('listing/chat.html', { root: viewsDir });
});
exports.default = baseRouter;
