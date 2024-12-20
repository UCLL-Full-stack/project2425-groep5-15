import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types';
import { request } from 'node:http';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       required:
 *         - firstName
 *         - lastName
 *         - username
 *         - email
 *         - password
 *         - role
 *       example:
 *         id: 1
 *         firstName: 'John'
 *         lastName: 'Doe'
 *         username: 'johndoe'
 *         email: 'johndoe@example.com'
 *         password: 'password123'
 *         role: 'user'
 */


const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Add a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: The user was successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body;
        const result = await userService.authenticate(userInput);
        res.status(200).json({message: 'Authentication successful', ...result});
    } catch (error) {
        next(error);
    }
})

/**
 * @swagger
 * /users/tickets/{id}:
 *   get:
 *     summary: Get user tickets by user ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of tickets for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ticketId:
 *                     type: integer
 *                   eventName:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 */

userRouter.get('/tickets/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const tickets = await userService.getUserTicketsById(userId);
        res.status(200).json(tickets);
    } catch (error) {
        next(error);
    }
});

// const request = req as Request & {auth: {username: string}};
// const {username} = request.auth;

/**
 * @swagger
 * /users/tickets:
 *   put:
 *     summary: Add a ticket to a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               showId:
 *                 type: integer
 *             required:
 *               - showId
 *     responses:
 *       200:
 *         description: The ticket was successfully added to the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
    */          

// userRouter.put('/tickets', async (req: Request & { auth: any}, res: Response, next: NextFunction) => {
//     try {
//         const {username} = req.auth;
//         const {showId} = req.body;   
//         const result = await userService.addTicketToUser(username, showId);
//         res.status(200).json(result);
//     } catch (error) {
//         next(error);
//     }

// });




export { userRouter };