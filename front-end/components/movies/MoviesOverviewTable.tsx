import React, { useState, useEffect } from 'react';
import { Movie, Show } from '@types';
import MovieService from '@services/movieService';

type Props = {
  movies: Array<Movie>;
};

const MoviesOverviewTable: React.FC<Props> = ({ movies }: Props) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [filteredMovies, setFilteredMovies] = useState<Array<Movie>>(movies);

  const handleRowClick = (movie: Movie) => {
    setSelectedMovie(movie === selectedMovie ? null : movie);
  };

  const handleDateChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    setSelectedMovie(null);
    if (date) {
      try {
        const response = await MovieService.getMoviesByDate(date);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Show[] = await response.json();
        const transformedMovies = data.map(show => show.movie);
        setFilteredMovies(transformedMovies);
      } catch (error) {
        console.error('Error fetching movies by date:', error);
        setFilteredMovies([]);
      }
    } else {
      setFilteredMovies(movies);
    }
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
        console.error('Error fetching all movies:', error);
      }
    };

    fetchAllMovies();
  }, [movies]);

  return (
    <>
      <div className="date-picker">
        <label htmlFor="date">Select a date: </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {filteredMovies && filteredMovies.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">{selectedDate ? `Film(s) op ${selectedDate}` : 'Films'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie, index) => (
              <tr key={index} onClick={() => handleRowClick(movie)} role="button">
                <td>{movie.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No movies available for the selected date.</p>
      )}
      {selectedMovie && selectedMovie.genres && (
        <>
          <h2>Genres for {selectedMovie.title}</h2>
          <div>{selectedMovie.genres.join(', ')}</div>
        </>
      )}
    </>
  );
};

export default MoviesOverviewTable;