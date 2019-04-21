import { CREATE_BOARD_FORM_STATUS } from '../constants';

const changeBCreateBoardFormStatus = (isCreateBoardFormOpen) => ({
  type: CREATE_BOARD_FORM_STATUS,
  payload: isCreateBoardFormOpen,
});

export default changeBCreateBoardFormStatus;
