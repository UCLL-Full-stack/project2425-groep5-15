import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {movieRouter} from './controller/movie.routes';
import {showRouter} from './controller/show.routes';
import { userRouter } from './controller/user.routes';
import { expressjwt } from 'express-jwt';


const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/shows', showRouter);
app.use('/users', userRouter);
app.use('/movies', movieRouter); // als authenticatie in front end is gedaan, dan moeten de routes onder expressjwt komen


app.use(
    expressjwt({ 
        secret: process.env.JWT_SECRET || 'default_secret', 
        algorithms: ['HS256'] 
    }).unless({
        path: ['/status', '/api-docs', /^\/api-docs\/.*/, '/users/signup', '/users/login']
    })
)


// hier komen de routes
app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});
app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(400).json({
        status: 'application error',
        message: err.message,
    });
});

