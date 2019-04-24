// users
export const CHANGE_USER_LOGGED_IN_STATUS = 'CHANGE_USER_LOGGED_IN_STATUS';

// boards
// change when use clicks on the arrow in the navbar to create a new board.`
export const CHANGE_CREATE_BOARD_FORM_STATUS =
  'CHANGE_CREATE_BOARD_FORM_STATUS';
// when the use clicks the horizontal ellipsis icon(***) when changing the board background
export const CHANGE_CREATE_BOARD_BACKGROUND = 'CHANGE_CREATE_BOARD_BACKGROUND';

// when the create board component mounts it fires an request for
// the latest 6 photos
export const REQUEST_LATEST_SIX_PHOTOS = 'REQUEST_LATEST_SIX_PHOTOS';
export const RECEIVED_LATEST_SIX_PHOTOS = 'RECEIVED_LATEST_SIX_PHOTOS';

// when the user click on 'See more' in photos
// request is fired to fetch a collection of the latest photos
export const REQUEST_LATEST_PHOTOS = 'REQUEST_LATEST_PHOTOS';
export const RECEIVED_LATEST_PHOTOS = 'RECEIVED_LATEST_PHOTOS';
// empty the latest photos collection
export const REMOVE_LATEST_PHOTOS = 'REMOVE_LATEST_PHOTOS';

// when the user starts typing a query to search for
// request is fired to fetch photos that match their input
export const REQUEST_QUERY_PHOTOS = 'REQUEST_QUERY_PHOTOS';
export const RECEIVED_QUERY_PHOTOS = 'RECEIVED_QUERY_PHOTOS';
