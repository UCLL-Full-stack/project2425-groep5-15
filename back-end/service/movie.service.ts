import {Movie} from '../model/movie';
import movieDB from '../repository/movie.db';
import { MovieInput } from '../types';

const getAllMovies = (): Movie[] => movieDB.getAllMovies();


const addMovie = ({title, releaseDate, duration, genres }: MovieInput): Movie => {
    
    const existingMovieByTitle = movieDB.getAllMovies().find(m => m.title === title);
    if (existingMovieByTitle) {
        throw new Error('A movie with this title already exists');
    }


    const movie = new Movie({title, releaseDate, duration, genres});
    return movieDB.addMovie(movie);
};



export default {
    getAllMovies,
    addMovie,
}