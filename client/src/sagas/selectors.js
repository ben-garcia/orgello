// selectors are functions that take state and return a piece of state.
// in this case the latestPhotos property of state.createBoard

export const getLatestPhotosPage = (state) => state.createBoard.latestPhotos;

export const getQueryPhotosFromState = (state) => state.createBoard.queryPhotos;
