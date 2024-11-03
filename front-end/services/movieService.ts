const getAllMovies = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };
  
  const getMovieById = async (movieId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/movies/${movieId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };
  
  const MovieService = {
    getAllMovies,
    getMovieById,
  };
  
  export default MovieService;