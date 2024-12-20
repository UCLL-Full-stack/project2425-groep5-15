import {Movie} from '../model/movie';
import Show from '../model/show';
import movieDB from '../repository/movie.db';
import showDB from '../repository/show.db';
import { MovieInput } from '../types';

const getAllMovies = async (): Promise<Movie[]> => await movieDB.getAllMovies();


const addMovie = async ({title, releaseDate, duration, genres }: MovieInput): Promise<Movie> => {
    if (await movieDB.getMovieByTitleAndReleaseDate(title, new Date(releaseDate))) {
        throw new Error('This movie already exists');
    }
    const movie = new Movie({title, releaseDate: new Date(releaseDate), duration, genres});
    return movieDB.addMovie(movie);
    
};


const deleteMovie = async (id: number): Promise<string> => {
    if (!id) {
        throw new Error('Id cannot be empty');
    }
    await showDB.deleteShowsByMovieId(id);
    const movie = await movieDB.deleteMovie(id);
    if (!movie) {
        throw new Error('Movie with this id does not exist');
    }
    
    return "Movie deleted successfully";
}

const updateMovie = async ({id, title, releaseDate, duration, genres }: MovieInput): Promise<Movie> => {
    if (!id) {
        throw new Error('Id cannot be empty');
    }
    const movie = await movieDB.getMovieById(id);
    if (!movie) {
        throw new Error('Movie with this id does not exist');
    }
    const updatedMovie = new Movie({id, title, releaseDate: new Date(releaseDate), duration, genres});
    return movieDB.updateMovie(updatedMovie);
}



export default {
    getAllMovies,
    addMovie,
    deleteMovie,
    updateMovie,
}