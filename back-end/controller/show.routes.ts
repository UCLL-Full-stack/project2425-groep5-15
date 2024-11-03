/**
 * @swagger
 * components:
 *   schemas:
 *     Show:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the show
 *         start:
 *           type: string
 *           format: date-time
 *           description: The start time of the show
 *         movie:
 *           $ref: '#/components/schemas/Movie'
 *           description: The movie being shown
 *         room:
 *           $ref: '#/components/schemas/Room'
 *           description: The room where the show is taking place
 *       required:
 *         - start
 *         - movie
 *         - room
 *       example:
 *         id: 1
 *         start: '2026-01-01T12:00:00Z'
 *         movie:
 *           id: 1
 *           title: 'Inception'
 *           releaseDate: '2010-07-16'
 *           duration: 148
 *           genres: ['Action', 'Sci-Fi', 'Thriller']
 *         room:
 *           id: 1
 *           capacity: 100
 */


import express, { NextFunction, Request, Response } from 'express';
import showService from '../service/show.service';


const showRouter = express.Router();

/**
 * @swagger
 * /shows:
 *   get:
 *     summary: Get all shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: A list of shows.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
 */

showRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shows = await showService.getAllShows();
        res.status(200).json(shows);
    } catch (error) {
        next(error);
    }
})


showRouter.get('/:date', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const date = new Date(req.params.date);
        const shows = await showService.getShowsByDate(date);
        res.status(200).json(shows);
    } catch (error) {
        next(error);
    }
});


export { showRouter };


