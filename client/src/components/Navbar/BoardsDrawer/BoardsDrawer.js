import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { requestBoardInformation } from '../../../actions/board';

import './BoardsDrawer.scss';

const BoardsDrawer = ({ usersBoards, requestBoardInfo }) => {
  return (
    <div className="boards-drawer">
      <span className="boards-drawer__title">Your Boards</span>
      <ul className="boards-drawer__list">
        {usersBoards &&
          usersBoards.map((board) => {
            const style =
              board.background[0] === 'u'
                ? {
                    backgroundImage: board.background,
                    backgroundPosition: '50%',
                    backgroundRepeat: 'no-repeat',
                  }
                : { backgroundColor: board.background };
            return (
              <li className="drawer-board" key={board.id} style={style}>
                <div className="drawer-board__image" />
                <div className="drawer-board__background">
                  <Link
                    className="drawer-board__title"
                    to={{
                      pathname: `/board/${board.title.split(' ').join('-')}`,
                      state: board,
                    }}
                    onClick={() => {
                      // store the clicked on board in localStorage to have access to it
                      // on page refresh
                      localStorage.setItem('board', JSON.stringify(board));
                      requestBoardInfo(board.id);
                    }}
                  >
                    {board.title}
                  </Link>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

BoardsDrawer.propTypes = {
  usersBoards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  requestBoardInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usersBoards: state.user.boards,
});

const mapDispatchToProps = (dispatch) => ({
  requestBoardInfo: (boardId) => dispatch(requestBoardInformation(boardId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsDrawer);
