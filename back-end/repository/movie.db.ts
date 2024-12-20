import { th } from 'date-fns/locale';
import {Movie} from '../model/movie';
import database from '../util/database';

const getAllMovies = async (): Promise<Movie[]> => {
    const moviePrisma = await database.movie.findMany();
    return moviePrisma.map((moviePrisma) => Movie.from(moviePrisma));
}

const getMovieByTitleAndReleaseDate = async (title: string, releaseDate: Date): Promise<Movie | null> => {
    try {
        const moviePrisma = await database.movie.findFirst({
            where: {
                title: title,
                releaseDate: releaseDate
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

const deleteMovie = async (id: number): Promise<Movie | null> => {
    try {
        const moviePrisma = await database.movie.delete({
            where: {
                id: id
            }
        });
        return moviePrisma ? Movie.from(moviePrisma) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


const updateMovie = async ({ id, title, releaseDate, duration, genres }: Movie): Promise<Movie> => {
    try {
        const moviePrisma = await database.movie.update({
            where: {
                id: id
            },
            data: {
                title: title,
                releaseDate: releaseDate,
                duration: duration,
                genres: genres
            }
        });
        return Movie.from(moviePrisma)
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getMovieById = async (id: number): Promise<Movie | null> => {
    try {
        const moviePrisma = await database.movie.findFirst({
            where: {
                id: id
            }
        });
        return moviePrisma ? Movie.from(moviePrisma): null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default{
    getAllMovies,
    getMovieByTitleAndReleaseDate,
    addMovie,
    deleteMovie,
    updateMovie,
    getMovieById,
};
