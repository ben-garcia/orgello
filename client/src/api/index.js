// server api endpoints

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://orgello.herokuapp.com'
    : 'http://localhost:9000';

export const fetchData = async (url, query, page, perPage) => {
  let photos = null;
  const urlQuery = `${url}?query=${query}&page=${page}&perPage=${perPage}`;

  try {
    const response = await fetch(urlQuery);
    photos = await response.json();
  } catch (e) {
    // eslint-disable-next-line
    console.log('fetchPhotos error: ', e.message);
  }

  return photos;
};

export const submitNewBoard = async ({ title, background, ownerId }) => {
  let responseJson = null;
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch(`${baseUrl}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        background,
        ownerId,
      }),
    });
    responseJson = await response.json();
  } catch (e) {
    // eslint-disable-next-line
    console.log('submitNewBoard() error: ', e.message);
  }

  return responseJson;
};

export const getUsersBoards = async (ownerId) => {
  let responseJson = null;
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch(`${baseUrl}/boards?ownerId=${ownerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    responseJson = await response.json();
  } catch (e) {
    // eslint-disable-next-line
    console.log('getUsersBoards() error: ', e.message);
  }

  return responseJson;
};

export const updateResource = async (url, bodyContent) => {
  let responseJson = null;
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyContent),
    });
    responseJson = await response.json();
  } catch (e) {
    // eslint-disable-next-line
    console.log('updateResource() error: ', e.message);
  }

  return responseJson;
};

export const createResource = async (url, bodyContent) => {
  let responseJson = null;
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyContent),
    });
    responseJson = await response.json();
  } catch (e) {
    // eslint-disable-next-line
    console.log('updateResource() error: ', e.message);
  }

  return responseJson;
};

export const getBoard = async (url) => {
  let responseJson = null;
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    responseJson = await response.json();
  } catch (e) {
    // eslint-disable-next-line
    console.log('getBoard() error: ', e.message);
  }

  return responseJson;
};

export const triggerPhotoDownload = async (photoId) => {
  const url = `${baseUrl}/photos/download?id=${photoId}`;
  let responseJson = null;

  try {
    const response = await fetch(url);
    responseJson = await response.json();
  } catch (e) {
    // eslint-disable-next-line
    console.log('triggerPhotoDownload() error: ', e.message);
  }

  return responseJson;
};
