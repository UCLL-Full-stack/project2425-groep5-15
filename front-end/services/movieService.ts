import { Movie } from "@types";

const getAllMovies = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());
};

const getMoviesByDate = async (date: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/shows/${date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());
};

const addNewMovie = async (movie: Movie) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  }).then(response => response.json());
};

const deleteMovie = async (movieId: number) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/delete/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());
};

const MovieService = {
  getAllMovies,
  getMoviesByDate,
  addNewMovie,
  deleteMovie,
};

export default MovieService;