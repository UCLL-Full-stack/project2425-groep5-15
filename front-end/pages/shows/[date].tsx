import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import HeaderNoL from '@components/headerNoL';
import ShowService from '@services/showService';
import { Show, User } from '@types';
import { useRouter } from 'next/router';

const ShowsByDatePage: React.FC = () => {
  const [shows, setShows] = useState<Array<Show>>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [formData, setFormData] = useState<Show | null>(null);
  const router = useRouter();
  const { date } = router.query;

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const parsedUser: User = JSON.parse(user);
      setLoggedInUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (date) {
      const fetchShows = async () => {
        try {
          const formattedDate = new Date(date as string).toISOString().split('T')[0];
          const data = await ShowService.getShowsByDate(formattedDate);
          setShows(data);
        } catch (error) {
          console.error('Error fetching shows:', error);
        }
      };

      fetchShows();
    }
  }, [date]);

  const handleRowClick = (show: Show) => {
    if (loggedInUser?.role === 'admin' || loggedInUser?.role === 'planner') {
      setSelectedShow(show);
      setFormData(show);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        const updatedShow = await ShowService.updateShow(formData);
        setShows(shows.map(show => (show.id === updatedShow.id ? updatedShow : show)));
        setSelectedShow(null);
        setFormData(null);
      } catch (error) {
        console.error('Error updating show:', error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Shows - Cinematic</title>
        <meta name="description" content="Shows page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderNoL />
      <main className="d-flex flex-column justify-content-center align-items-center">
        {loggedInUser ? (
          <>
            {selectedShow && (
              <div className="show-form-container">
                <h2>Edit Show</h2>
                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label>Show Time:</label>
                    <input
                      type="datetime-local"
                      name="start"
                      value={new Date(formData?.start || '').toISOString().slice(0, 16)}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Available Seats:</label>
                    <input
                      type="number"
                      name="availableSeats"
                      value={formData?.availableSeats || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit">Update Show</button>
                </form>
              </div>
            )}
            {shows.length > 0 ? (
              <div className="table-container">
                <table className="table table-hover fixed-width-table">
                  <thead>
                    <tr>
                      <th scope="col">Show Time</th>
                      <th scope="col">Movie Title</th>
                      <th scope="col">Room Capacity</th>
                      <th scope="col">Available Seats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shows.map((show, index) => (
                      <tr key={index} onClick={() => handleRowClick(show)} role="button">
                        <td>{new Date(show.start).toLocaleTimeString()}</td>
                        <td>{show.movie.title}</td>
                        <td>{show.room.capacity}</td>
                        <td>{show.availableSeats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No shows available for the selected date.</p>
            )}
          </>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>Unauthorized</h1>
            <p>You must be logged in to view this page.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default ShowsByDatePage;