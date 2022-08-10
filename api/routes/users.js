const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const checkAuth = require('../middleware/check_Auth');
const roleAuth = require('../middleware/role_Auth');


/**
 * @swagger
 * components:
 *       schema:
 *          users:
 *                type: object
 *                properties: 
 *                     name: 
 *                         type: string
 *                     email:
 *                         type: string
 *                     password: 
 *                         type: string
 *                     phoneNumber:
 *                         type: string
 * 
 *          
 */

/**
 * @swagger
 * components:
 *       schema:
 *          user:
 *                type: object
 *                properties: 
 *                     email:
 *                         type: string
 *                     password: 
 *                         type: string
 * 
 *          
 */

/**
 * @swagger
 * /users/signup:
 *   post: 
 *     tags:
 *        - Auth 
 *     summary: User authentication 
 *     description: Create new User
 *     requestBody: 
 *         required: true 
 *         content: 
 *                 application/json:
 *                       schema:
 *                           $ref: '#/components/schema/users'
 *     responses:
 *         200: 
 *            description: User created 
 *                  
 */


/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *        - Auth 
 *     summary: User authentication 
 *     description: Login existing account
 *     requestBody: 
 *         required: true 
 *         content: 
 *                 application/json:
 *                       schema:
 *                           $ref: '#/components/schema/user'
 *     responses:
 *         200: 
 *            description: Successful login
 *                  
 */



/**
 * @swagger
 * components:
 *       schema:
 *          destination:
 *                type: object
 *                properties: 
 *                     destination:
 *                         type: string
 *                     
 * 
 *          
 */

/**
 * @swagger
 * components:
 *       schema:
 *          status:
 *                type: object
 *                properties: 
 *                     status:
 *                         type: string
 *                     
 * 
 *          
 */

/**
 * @swagger
 * components:
 *       schema:
 *          currentLocation:
 *                type: object
 *                properties: 
 *                     currentLocation:
 *                         type: string
 *       
 *                     
 * 
 *          
 */


/**
 * @swagger
 * components:
 *       schema:
 *          product:
 *                type: object
 *                properties:
 *                     itemDescription: 
 *                         type: string
 *                     price: 
 *                         type: string
 *                     pickupLocation:
 *                         type: string
 *                     destination: 
 *                         type: string
 *                     currentLocation:
 *                         type: string
 *                     recipientName:
 *                         type: string
 *                     recipientNumber:
 *                         type: string
 *                    
 * 
 *          
 */






/**
 * @swagger
 * /products/:
 *   get:
 *     tags:
 *        - Parcels
 *     security: 
 *       - bearerAuth: []
 *     summary: Get All parcels 
 *     description: Get all parcels
 *     responses:
 *         200: 
 *            description: All parcels listed 
 *
 *                  
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *        - Parcels
 *     security: 
 *        - bearerAuth: []
 *     summary: Post new product 
 *     description: Add new parcel 
 *     requestBody: 
 *         required: true 
 *         content: 
 *                 application/json:
 *                       schema:
 *                           $ref: '#/components/schema/product'
 *     responses:
 *         200: 
 *            description: All parcels listed                
 */


/**
 * @swagger
 * /products/user:
 *   get:
 *     tags:
 *        - Parcels
 *     security: 
 *       - bearerAuth: []
 *     summary: Get user product 
 *     description: Get parcels by a user 
 *     responses:
 *         200: 
 *            description: Product found
 *                  
 */

/**
 * @swagger
 * /products/{id}/destination:
 *   put:
 *     tags:
 *        - Parcels
 *     security: 
 *       - bearerAuth: []
 *     summary: Change destination 
 *     description: Edit destination
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: Numeric ID required 
 *     requestBody: 
 *         required: true 
 *         content: 
 *                 application/json:
 *                       schema:
 *                           $ref: '#/components/schema/destination'
 *     responses:
 *         content type:
 *           application/json:
 *         200: 
 *            description: Destination updated               
 */


/**
 * @swagger
 * /products/{id}/status:
 *   put:
 *     tags:
 *        - Parcels
 *     security: 
 *       - bearerAuth: []
 *     summary: Change status 
 *     description: Edit status 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: Numeric ID required
 *     requestBody: 
 *         required: true 
 *         content: 
 *                 application/json:
 *                       schema:
 *                           $ref: '#/components/schema/status'
 *     responses:
 *         content type:
 *           application/json:
 *         200: 
 *            description: status updated               
 */

/**
 * @swagger
 * /products/{id}/currentLocation:
 *   put:
 *     tags:
 *        - Parcels
 *     security: 
 *       - bearerAuth: []
 *     summary: Change currentLocation 
 *     description: Edit currentLocation
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: Numeric ID required 
 *     requestBody: 
 *         required: true 
 *         content: 
 *                 application/json:
 *                       schema:
 *                           $ref: '#/components/schema/currentLocation'
 *     responses:
 *         content type:
 *           application/json:
 *         200: 
 *            description: currentLocation updated               
 */


/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *        - Parcels
 *     security: 
 *       - bearerAuth: []
 *     summary: Delete a parcel order 
 *     description: Delete an order by ID 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: string
 *         required: true
 *         description: Numeric ID required 
 *     responses:
 *         200: 
 *            description: product deleted               
 */






router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(doc => {
            if (doc >= 1) {
                return res.status(409).json({
                    message: 'User exists!'
                });
            } else {
                 bcrypt.hash(req.body.password, 10, (err, hash) => {


                    if (err) {
                        return res.status(402).json({
                            error: err,

                        });
                    } else {

                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            phoneNumber: req.body.phoneNumber,




                        })
                        user
                            .save()
                            .then(data => {
                                const adminEmail = "kashystone@yahoo.com";
                                const role = user.email === adminEmail ? "admin" : "user";
                                const token = jwt.sign({
                                    email: user.email,
                                    userId: user._id,
                                    role: role
                                }, process.env.JWT_KEY,
                                    {
                                        expiresIn: "1h"
                                    })

                                res.status(200).json({
                                    message: 'You have sucessfully signed up',
                                    token: token


                                })

                            })
                            .catch(err => {
                                res.status(500).json({ error: err })
                            });
                    }
                });
            };
        })



});
router.post("/login",  (req, res,) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(402).json({
                    message: 'User not found!'

                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Incorrect Username/Password!'

                    });
                }
                if (result) {
                    const adminEmail = "kashystone@yahoo.com";
                    const role = user[0].email === adminEmail ? "admin" : "user";
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        role: role
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        })
                    res.status(200).json({
                        message: 'Login successful',
                        token: token

                    })
                }
            })

        });
});



router.delete('/:userId', roleAuth, (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(data => {
            res.status(200).json({
                message: "User Deleted"
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

});











module.exports = router;