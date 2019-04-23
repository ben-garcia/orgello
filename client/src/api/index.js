// server api endpoints

export const authUrl = 'http://localhost:9000/auth';

export const fetchPhotos = async (url) => {
  let photos = null;

  try {
    const response = await fetch(url);
    photos = await response.json();
  } catch (e) {
    console.log('fetchPhotos error: ', e.message);
  }

  return photos;
};
