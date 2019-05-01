// server api endpoints

export const authUrl = 'http://localhost:9000/auth';
const boardUrl = 'http://localhost:9000/boards';

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

export const submitNewBoard = async ({ title, background, ownerId }) => {
  let responseJson = null;

  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch(boardUrl, {
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
    console.log('submitNewBoard() error: ', e.message);
  }

  return responseJson;
};

export const getUsersBoards = async (ownerId) => {
  let responseJson = null;

  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch(`${boardUrl}?ownerId=${ownerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    responseJson = await response.json();
  } catch (e) {
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
    console.log('updateResource() error: ', e.message);
  }

  return responseJson;
};
