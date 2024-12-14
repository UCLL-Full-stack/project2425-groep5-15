import {Movie} from '../model/movie';
import movieDB from '../repository/movie.db';
import { MovieInput } from '../types';

const getAllMovies = async (): Promise<Movie[]> => await movieDB.getAllMovies();


const addMovie = async ({title, releaseDate, duration, genres }: MovieInput): Promise<Movie> => {
    if (await movieDB.getMovieByTitle(title)) {
        throw new Error('A movie with this title already exists');
    }
    const movie = new Movie({title, releaseDate: new Date(releaseDate), duration, genres});
    return movieDB.addMovie(movie);
    
};



export default {
    getAllMovies,
    addMovie,
}