import {Movie} from '../model/movie';
import movieDB from '../repository/movie.db';

const getAllMovies = (): Movie[] => movieDB.getAllMovies();

export default {
    getAllMovies,
}