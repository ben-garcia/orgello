/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import BackgroundOptions from '../BackgroundOptions';
import List from '../List';
import { loginUser, requestUsersBoards } from '../../actions/users';
import {
  changeBackgroundOptions,
  requestLatestSixPhotos,
} from '../../actions/boards';
import {
  getBoardInfo,
  requestBoardTitleChange,
  requestBoardInformation,
  receivedBoardTitleChange,
} from '../../actions/board';
import { addList, requestCreateList } from '../../actions/lists';
import './styles.scss';
import { TEST_ACCOUNT_USERNAME } from '../../constants';

const Board = ({
  history,
  login,
  usersBoards,
  username,
  isUserLoggedIn,
  requestAllUsersBoards,
  board,
  isBackgroundOptionsOpen,
  changeBackOptions,
  requestSixPhotos,
  requestNewBoardTitle,
  requestBoardInfo,
  addNewList,
  requestCreateNewList,
  isCreateBoardFormOpen,
  receivedTitleChange,
}) => {
  let savedUser = localStorage.getItem('user');
  const [title, changeTitle] = useState(board.title);
  const [showTitleInput, toggleTitleInput] = useState(false);
  const [isCreateListFormOpen, toggleCreateListForm] = useState(false);
  const [listTitle, changeListTitle] = useState('');
  // to be able to focus then the input is visible
  const titleInputRef = useRef(null);
  // get the width to set the input width
  const titleButtonRef = useRef(null);
  // focus the list title input
  const listTitleRef = useRef(null);

  if (savedUser) {
    // parse the user object
    savedUser = JSON.parse(savedUser);
    if (!isUserLoggedIn) {
      // if the user is stored in localStorage then
      // set the dispatch isUserLoggedInStatus(true)
      login({ ...savedUser, isLoggedIn: true });
    }

    if (usersBoards.length === 0) {
      // fetch all boards that are associated with the current user
      requestAllUsersBoards();
    }
  } else {
    history.replace('/login');
  }

  if (localStorage.getItem('board') && !board.background) {
    const currentBoard = JSON.parse(localStorage.getItem('board'));
    requestBoardInfo(currentBoard.id);
  }

  if (showTitleInput) {
    // delay enough for the title input to be visible
    setTimeout(() => titleInputRef.current.focus(), 100);
  }

  // when the create list for is rendered
  if (isCreateListFormOpen) {
    setTimeout(() => listTitleRef.current.focus(), 100);
  }

  return (
    <section className="board">
      <div className="board__background-options">
        {/* dont render when the user is creating a new board */}
        {isBackgroundOptionsOpen && !isCreateBoardFormOpen ? (
          <BackgroundOptions />
        ) : null}
      </div>
      <div className="board__header">
        <button
          className="board__title board__title--button"
          style={showTitleInput ? { display: 'none' } : {}}
          ref={titleButtonRef}
          type="button"
          onClick={() => {
            toggleTitleInput(true);
          }}
        >
          {board.title ? board.title : title}
        </button>
        <input
          className="board__title board__title--input"
          style={showTitleInput ? {} : { display: 'none' }}
          ref={titleInputRef}
          onChange={() => {
            changeTitle(titleInputRef.current.value);
          }}
          onBlur={() => {
            toggleTitleInput(false);
            if (titleInputRef.current.value.length === 0) {
              // when the input is empty
              // reset title to the board title.
              changeTitle(board.title);
            } else if (username !== TEST_ACCOUNT_USERNAME) {
              requestNewBoardTitle({ id: board.id, title });
            } else if (username === TEST_ACCOUNT_USERNAME) {
              // there is on need to send a requet to
              // the server on the test account.
              receivedTitleChange({ board: { title } });
            }
          }}
        />
        <button
          className="header-button"
          type="button"
          onClick={() => {
            // dispatch action to fetch latest six photos
            // only if the user clicks the 'Change Background' button
            // better to dispatch the action here then every time
            // the Board renders for the first time
            requestSixPhotos();
            changeBackOptions(!isBackgroundOptionsOpen);
          }}
        >
          Change Background
        </button>
      </div>
      <div className="board-container">
        <Droppable
          droppableId="board-container"
          direction="horizontal"
          type="LIST"
        >
          {(provided) => (
            <section className="lists" ref={provided.innerRef}>
              {board.lists &&
                board.lists
                  .sort((a, b) => a.order - b.order)
                  .map((list, index) => (
                    <List key={list.id} list={list} listIndex={index} />
                  ))}
              {provided.placeholder}
            </section>
          )}
        </Droppable>

        <form className="form-container">
          {!isCreateListFormOpen ? (
            <div
              className="form-trigger"
              onClick={() => toggleCreateListForm(!isCreateListFormOpen)}
            >
              <i className="fas fa-plus" />
              <span className="form-trigger__text">Add a list</span>
            </div>
          ) : (
            <div className="board-list-form">
              <input
                className="board-list-form__input"
                type="text"
                placeholder="Enter list title"
                ref={listTitleRef}
                onChange={(e) => changeListTitle(e.target.value)}
              />
              <div className="board-list-form__inner">
                <button
                  className="board-list-from__button board-list-form__button--submit"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();

                    // make sure that title input is not empty
                    // before calling api
                    if (listTitleRef.current.value) {
                      let order = null;
                      if (board.lists.length === 0) {
                        order = 100000;
                      } else {
                        order = 200000 * board.lists.length;
                      }

                      const list = {
                        title: listTitle.trim(),
                        order,
                        boardId: board.id,
                      };
                      if (username !== TEST_ACCOUNT_USERNAME) {
                        // dispatch action to create new list
                        // and add it to board.lists
                        requestCreateNewList(list);
                      } else {
                        const date = new Date().toString();
                        list.id = Math.random();
                        list.cards = [];
                        list.createdAt = date;
                        list.updatedAt = date;
                        addNewList(list);
                      }
                      // reset the list title
                      listTitleRef.current.value = '';
                    }
                  }}
                >
                  Add List
                </button>
                <button
                  className="board-list-from__button board-list-form__button--close"
                  type="button"
                  onClick={() => toggleCreateListForm(!isCreateListFormOpen)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

Board.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      boardTitle: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
  username: PropTypes.string,
  usersBoards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      background: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    })
  ),
  isUserLoggedIn: PropTypes.bool,
  requestAllUsersBoards: PropTypes.func.isRequired,
  // eslint-disable-next-line
  board: PropTypes.object.isRequired,
  isBackgroundOptionsOpen: PropTypes.bool.isRequired,
  changeBackOptions: PropTypes.func.isRequired,
  requestSixPhotos: PropTypes.func.isRequired,
  requestNewBoardTitle: PropTypes.func.isRequired,
  requestBoardInfo: PropTypes.func.isRequired,
  addNewList: PropTypes.func.isRequired,
  requestCreateNewList: PropTypes.func.isRequired,
  isCreateBoardFormOpen: PropTypes.bool.isRequired,
  receivedTitleChange: PropTypes.func.isRequired,
};

Board.defaultProps = {
  isUserLoggedIn: false,
  usersBoards: [],
  username: '',
};

const mapStateToProps = (state) => ({
  isUserLoggedIn: state.user.isLoggedIn,
  usersBoards: state.user.boards,
  username: state.user.username,
  board: state.board,
  isBackgroundOptionsOpen: state.createBoard.isBackgroundOptionsOpen,
  isCreateBoardFormOpen: state.createBoard.isFormOpen,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userInfo) => dispatch(loginUser(userInfo)),
  requestAllUsersBoards: () => dispatch(requestUsersBoards()),
  getBoardInformation: (info) => dispatch(getBoardInfo(info)),
  changeBackOptions: (status) => dispatch(changeBackgroundOptions(status)),
  requestSixPhotos: () => dispatch(requestLatestSixPhotos()),
  requestNewBoardTitle: (payload) => dispatch(requestBoardTitleChange(payload)),
  requestBoardInfo: (board) => dispatch(requestBoardInformation(board)),
  addNewList: (list) => dispatch(addList(list)),
  requestCreateNewList: (list) => dispatch(requestCreateList(list)),
  receivedTitleChange: (newTitle) =>
    dispatch(receivedBoardTitleChange(newTitle)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
