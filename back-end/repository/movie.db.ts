import {Movie} from '../model/movie';

const movies = [
    new Movie({
        id: 1,
        title: "Inception",
        releaseDate: new Date("2010-07-16"),
        duration: 148,
        genres: ["Action", "Sci-Fi", "Thriller"]
    }),
    new Movie({
        id: 2,
        title: "The Matrix",
        releaseDate: new Date("1999-03-31"),
        duration: 136,
        genres: ["Action", "Sci-Fi"]
    }),
    new Movie({
        id: 3,
        title: "Interstellar",
        releaseDate: new Date("2014-11-07"),
        duration: 169,
        genres: ["Adventure", "Drama", "Sci-Fi"]
    })
];

const getAllMovies = (): Movie[] => movies;

export default{
    getAllMovies,
};