import { Show } from '@types';

const getShowsByDate = async (date: string): Promise<Show[]> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows/${date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch shows');
    }
    return response.json();
  });
};

const ShowService = {
  getShowsByDate,
};

export default ShowService;