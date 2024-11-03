const getAllMovies = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };
  
  const getMovieByDate = async (movieDate: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/movies/${movieDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };
  
  const MovieService = {
    getAllMovies,
    getMovieByDate,
  };
  
  export default MovieService;