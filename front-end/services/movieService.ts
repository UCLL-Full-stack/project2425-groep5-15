const getAllMovies = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };
  
  const getMoviesByDate = async (date: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/shows/${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };
  
  const MovieService = {
    getAllMovies,
    getMoviesByDate,
  };
  
  export default MovieService;