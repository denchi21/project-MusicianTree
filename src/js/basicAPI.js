import axios from 'axios';
import '../css/styles.css';

const BASE_URL = 'https://sound-wave.b.goit.study/api';

export const LIMIT = 8;

export async function fetchData(url, options = {}) {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.data) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchArtists(page = 1, name = '', genre = '', sortName = '') {
  try {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('limit', LIMIT);
    if (name.trim()) {
      params.append('name', name);
    }
    if (genre.trim()) {
      params.append('genre', genre);
    }
    if (sortName.trim()) {
      params.append('sortName', sortName);
    }

    const response = await axios.get(`${BASE_URL}/artists`, {
      params: params
    });

    if (!response.data) {
      return [];
    }

    return response.data || [];
  } catch (error) {
    throw error;
  }
}

export async function fetchArtistData(id) {
  try {
    const response = await axios.get(`${BASE_URL}/artists/${id}`, {});

    if (!response.data) {
      return {};
    }

    return response.data || {};

  } catch (error) {
    throw error;
  }
}
