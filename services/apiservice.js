import axios from 'axios';

const API_URL = 'https://itsasr7.github.io/hotels/hotels.json';

export const getHotels = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
