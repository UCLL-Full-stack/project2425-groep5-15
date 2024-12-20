import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddNewMovie from '@components/movies/AddNewMovie';
import MovieService from '@services/movieService';

jest.mock('@services/movieService', () => ({
  addNewMovie: jest.fn().mockResolvedValue({}),
  getAllMovies: jest.fn(),
}));

describe('AddNewMovie', () => {
  beforeEach(() => {
    localStorage.setItem(
      'loggedInUser',
      JSON.stringify({
        token: 'fake-token',
        fullname: 'Test Admin',
        username: 'admin',
        role: 'admin',
      })
    );
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders the add new movie form with correct fields and button', () => {
    render(<AddNewMovie />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
    expect(screen.getByText(/release date/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /add movie/i })).toBeInTheDocument();
  });
});
