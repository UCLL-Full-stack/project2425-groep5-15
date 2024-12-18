import React, { useState, useEffect } from 'react';
import MovieService from '@services/movieService';
import { Movie, User } from '@types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { mutate } from 'swr';

const AddNewMovie: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [genres, setGenres] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const parsedUser: User = JSON.parse(user);
      setLoggedInUser(parsedUser);
    }
  }, []);

  const validate = () => {
    let result = true;
    setErrors([]);

    if (!title.trim()) {
      setErrors((errors) => [...errors, 'Title is required.']);
      result = false;
    }
    if (!genres.trim()) {
      setErrors((errors) => [...errors, 'Genres are required.']);
      result = false;
    }
    if (!duration || duration <= 0) {
      setErrors((errors) => [...errors, 'Duration must be a positive number.']);
      result = false;
    }
    if (!releaseDate) {
      setErrors((errors) => [...errors, 'Release date is required.']);
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const newMovie: Movie = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID for the new movie
      title,
      genres: genres.split(',').map((genre) => genre.trim()),
      duration,
      releaseDate: releaseDate || new Date(),
    };

    try {
      const response = await MovieService.addNewMovie(newMovie);
      if (!response.ok) {
        const data = await response.json();
        setErrors((errors) => [...errors, data.message]);
      } else {
        setStatus('Movie added successfully!');
        setTitle('');
        setGenres('');
        setDuration(0);
        setReleaseDate(null);
        // Update the movies list
        mutate('movies', async (movies?: Movie[]) => {
          const updatedMoviesResponse = await MovieService.getAllMovies();
          if (updatedMoviesResponse.ok) {
            const updatedMovies = await updatedMoviesResponse.json();
            return updatedMovies; 
          }
          return movies || [];
        }, false);
      }
    } catch (error) {
      setErrors((errors) => [...errors, 'Failed to add movie.']);
    }
  };

  if (!loggedInUser || loggedInUser.role !== 'admin') {
    return null; // Hide the form if the user is not logged in or not an admin
  }

  return (
    <div className="add-new-movie-container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.includes('Title is required.') && <div className="text-red-800">Title is required.</div>}
        </div>
        <div className="form-group">
          <label htmlFor="genres">Genres (comma separated)</label>
          <input
            type="text"
            id="genres"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            required
          />
          {errors.includes('Genres are required.') && <div className="text-red-800">Genres are required.</div>}
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
          {errors.includes('Duration must be a positive number.') && <div className="text-red-800">Duration must be a positive number.</div>}
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Release Date</label>
          <DatePicker
            selected={releaseDate}
            onChange={(date) => setReleaseDate(date)}
            dateFormat="MMMM d, yyyy"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          {errors.includes('Release date is required.') && <div className="text-red-800">Release date is required.</div>}
        </div>
        <button type="submit" className="submit-button">Add Movie</button>
        {status && <p className="message">{status}</p>}
        {!!errors.length && (
          <ul className="text-red-800 rounded-lg" role="alert">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default AddNewMovie;