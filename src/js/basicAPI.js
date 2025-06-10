async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { fetchData };
