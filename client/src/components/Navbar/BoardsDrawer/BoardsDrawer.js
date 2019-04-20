import React from 'react';
import { Link } from 'react-router-dom';

import './BoardsDrawer.scss';

const BoardsDrawer = () => (
  <div className="boards-drawer">
    <span className="boards-drawer__title">Your Boards</span>
    <ul className="boards-drawer__list">
      <li className="boards-drawer__item">
        <Link to="/board/board1">Board 1</Link>
      </li>
      <li className="boards-drawer__item">
        <Link to="/board/board2">Board 2</Link>
      </li>
      <li className="boards-drawer__item">
        <Link to="/board/board3">Board 3</Link>
      </li>
      <li className="boards-drawer__item">
        <Link to="/board/board4">Board 4</Link>
      </li>
    </ul>
  </div>
);

export default BoardsDrawer;
