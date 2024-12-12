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
  const [filteredShows, setFilteredShows] = useState<Array<Show>>([]);

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
        const data: Show[] = await response.json();
        setFilteredShows(data);
        const transformedMovies = data.map(show => show.movie);
        setFilteredMovies(transformedMovies);
      } catch (error) {
        setFilteredMovies([]);
        setFilteredShows([]);
      }
    } else {
      setFilteredMovies(movies);
      setFilteredShows([]);
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
              {selectedDate && <th scope="col">Start Time</th>}
            </tr>
          </thead>
          <tbody>
            {filteredShows.length > 0 ? (
              filteredShows.map((show, index) => (
                <tr key={index} onClick={() => handleRowClick(show.movie)} role="button">
                  <td>{show.movie.title}</td>
                  <td>{new Date(show.start).toLocaleTimeString()}</td>
                </tr>
              ))
            ) : (
              filteredMovies.map((movie, index) => (
                <tr key={index} onClick={() => handleRowClick(movie)} role="button">
                  <td>{movie.title}</td>
                </tr>
              ))
            )}
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