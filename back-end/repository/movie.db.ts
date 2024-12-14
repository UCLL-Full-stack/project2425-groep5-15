import { th } from 'date-fns/locale';
import {Movie} from '../model/movie';
import database from '../util/database';

const getAllMovies = async (): Promise<Movie[]> => {
    const moviePrisma = await database.movie.findMany();
    return moviePrisma.map((moviePrisma) => Movie.from(moviePrisma));
}

const getMovieByTitle = async (title: string): Promise<Movie | null> => {
    try {
        const moviePrisma = await database.movie.findFirst({
            where: {
                title: title
            }
        });
        return moviePrisma ? Movie.from(moviePrisma) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');

    }
}


const addMovie = async ({title, releaseDate, duration, genres }: Movie): Promise<Movie> => {
    try {
        const moviePrisma = await database.movie.create({
            data: {
                title: title,
                releaseDate: releaseDate,
                duration: duration,
                genres: genres
            }
        })
        return Movie.from(moviePrisma);
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default{
    getAllMovies,
    getMovieByTitle,
    addMovie,
};
