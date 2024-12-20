import React, { useState, useEffect } from 'react';
import { Show } from '@types';
import ShowService from '@services/showService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

const ShowTable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      router.push(`/shows/${formattedDate}`);
    }
  };

  return (
    <div className="show-table-container">
      <div className="date-picker-container">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
      </div>
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
    </div>
  );
};

export default ShowTable;