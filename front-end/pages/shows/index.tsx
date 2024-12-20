import React, { useState } from 'react';
import Head from 'next/head';
import HeaderNoL from '@components/headerNoL';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

const ShowsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const adjustedDate = new Date(date);
      adjustedDate.setDate(adjustedDate.getDate() + 1);
      const formattedDate = adjustedDate.toISOString().split('T')[0];
      router.push(`/shows/${formattedDate}`);
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
        <a>Click on a date to see the planned shows</a>
        <a>For testen: there are shows plannen on 30/12/2024 and 31/12/2024</a>
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />
        </div>
      </main>
    </>
  );
};

export default ShowsPage;