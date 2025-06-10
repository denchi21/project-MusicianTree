import axios from 'axios';
import '../css/styles.css';


const BASE_URL = 'https://sound-wave.b.goit.study/api';

export const LIMIT = 8;

export async function fetchArtists(page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/artists`, {
      params: {
        page,
        limit: LIMIT,
      },
    });

    // Пeрeвіряем, щоо response.data існує
    if (!response.data) {
      console.error('Error: API returned no data');
      return [];
    }

    return response.data || [];

  } catch (error) {
    console.error('Error:', error);
    throw error
  }
}


export async function fetchArtistData(id) {
  try {
    const response = await axios.get(`${BASE_URL}/artists/${id}`, {});

    // Пeрeвіряем, щоо response.data існує
    if (!response.data) {
      console.error('Error: API returned no data');
      return {};
    }

    return response.data || {};

  } catch (error) {
    console.error('Error:', error);
    throw error
  }
}