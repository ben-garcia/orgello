// server api endpoints

export const authUrl = 'http://localhost:9000/auth';

export const fetchData = async (baseUrl, query, page, perPage) => {
  let photos = null;
  const url = `${baseUrl}?query=${query}&page=${page}&perPage=${perPage}`;

  try {
    const response = await fetch(url);
    photos = await response.json();
  } catch (e) {
    console.log('fetchPhotos error: ', e.message);
  }

  return photos;
};

export const submitNewBoard = async (url) => {
  console.log(`submitting new board to ${url}`);
  console.log('...');
};
