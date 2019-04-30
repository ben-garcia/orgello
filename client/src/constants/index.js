// users
// when a user is logged in
export const LOGIN_USER = 'LOGIN_USER';
// when a use is logged out
export const LOGOUT_USER = 'LOGOUT_USER';

// request all the boards associated with a particular user
export const REQUEST_USERS_BOARDS = 'REQUEST_USERS_BOARDS';
// when the request was successfull
export const RECEIVED_USERS_BOARDS = 'RECEIVED_USERS_BOARDS';

// board
// when the user is interacting with a single board
export const OPEN_BOARD = 'OPEN_BOARD';
// when the user exists the board page
export const CLOSE_BOARD = 'CLOSE_BOARD';
// when the user clicks on a board form their dashboard or
// if finished creating a new board.
export const GET_BOARD_INFO = 'GET_BOARD_INFO';
// when user changes board background in Board component
export const CHANGE_ACTIVE_BOARD_BACKGROUND = 'CHANGE_ACTIVE_BOARD_BACKGROUND';

// boards
// change when use clicks on the arrow in the navbar to create a new board.`
export const CHANGE_CREATE_BOARD_FORM_STATUS =
  'CHANGE_CREATE_BOARD_FORM_STATUS';

// when the user clicks on the horizontal ellipsis icon(***) when
// changing the board background or clicks the close button
export const CHANGE_BACKGROUND_OPTIONS = 'CHANGE_BACKGROUND_OPTIONS';

// title for the new board
export const CHANGE_CREATE_BOARD_TITLE = 'CHANGE_CREATE_BOARD_TITLE';

// when the use clicks on a new background image
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
// when the user is typing in the search field
// the value should change accordingly
export const CHANGE_QUERY_PHOTOS_SEARCH_TERM =
  'CHANGE_QUERY_PHOTOS_SEARCH_TERM';
// empty the query photos when user hits left arrow button
export const REMOVE_QUERY_PHOTOS = 'REMOVE_QUERY_PHOTOS';
