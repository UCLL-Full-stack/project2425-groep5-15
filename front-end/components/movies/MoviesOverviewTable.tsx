import React, { useState, useEffect } from 'react';
import { Movie } from '@types';
import MovieService from '@services/movieService';

type Props = {
  movies: Array<Movie>;
};

const MoviesOverviewTable: React.FC<Props> = ({ movies }: Props) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [filteredMovies, setFilteredMovies] = useState<Array<Movie>>(movies);

  const handleRowClick = (movie: Movie) => {
    setSelectedMovie(movie === selectedMovie ? null : movie);
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await MovieService.getAllMovies();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Movie[] = await response.json();
        setFilteredMovies(data);
      } catch (error) {
  
      }
    };

    fetchAllMovies();
  }, []);

  return (
    <div className="movies-overview-container">
      {filteredMovies && filteredMovies.length > 0 ? (
        <>
          <div className="table-container">
            <table className="table table-hover fixed-width-table">
              <thead>
                <tr>
                  <th scope="col">Movies</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(movie)}
                    role="button"
                    className={selectedMovie === movie ? 'selectedRow' : ''}
                  >
                    <td>{movie.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedMovie && (
              <div className="movie-details">
                <h2>Details for {selectedMovie.title}</h2>
                <div>Genres: {selectedMovie.genres.join(', ')}</div>
                <div>Release Date: {new Date(selectedMovie.releaseDate).toLocaleDateString()}</div>
                <div>Duration: {selectedMovie.duration} minutes</div>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>No movies available.</p>
      )}
    </div>
  );
};

export default MoviesOverviewTable;