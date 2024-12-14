/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Movie:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            title:
 *              type: string
 *              description: Movie title.
 *            releaseDate:
 *              type: string
 *              format: date
 *            duration:
 *              type: number
 *              description: Duration of the movie in minutes.
 *            genres:
 *              type: array
 *              items:
 *                type: string
 */

import express, { NextFunction, Request, Response } from 'express';
import movieService from '../service/movie.service';
import { MovieInput } from '../types';

const movieRouter = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */

movieRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }

});

/**
 * @swagger
 * /movies:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Add a movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: The movie was successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */

movieRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movie = <MovieInput>req.body;
        const result = await movieService.addMovie(movie);
        res.status(200).json(["This movie was successfully added:", movie]);
    } catch (error) {
        next(error);
        // res.status(400).json({status:'error', errorMessage: error.message});
    }
});

export { movieRouter };