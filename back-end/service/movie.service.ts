import {Movie} from '../model/movie';
import movieDB from '../repository/movie.db';

const getAllMovies = (): Movie[] => movieDB.getAllMovies();


const addMovie = (movie: Movie): void => {
    if (!movie) {
        throw new Error('The movie must be provided');
    }
    const existingMovie = movieDB.getAllMovies().find(m => m.getTitle === movie.getTitle);
    if (existingMovie) {
        throw new Error('A movie with this title already exists');
    }

    movieDB.addMovie(movie);
};



export default {
    getAllMovies,
    addMovie,
}