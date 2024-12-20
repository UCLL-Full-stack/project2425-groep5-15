import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import HeaderNoL from '@components/headerNoL';
import ShowService from '@services/showService';
import { Show } from '@types';
import { useRouter } from 'next/router';

const ShowsByDatePage: React.FC = () => {
  const [shows, setShows] = useState<Array<Show>>([]);
  const router = useRouter();
  const { date } = router.query;

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
                  <tr key={index}>
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
      </main>
    </>
  );
};

export default ShowsByDatePage;