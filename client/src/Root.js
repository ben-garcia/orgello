import React, { useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import Board from './components/Board/Board';

import { requestUpdateListOrder } from './actions/lists';

const Root = ({ board, requestUpdateNewListOrder }) => {
  let styles = null;

  if (board.background) {
    styles =
      board.background[0] === 'u'
        ? {
            backgroundImage: board.background,
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            width: '100vw',
            height: '100vh',
          }
        : { backgroundColor: board.background };
  }

  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;
    if (destination) {
      // console.log('source; ', board.lists[source.index]);
      // console.log('destination; ', board.lists[destination.index]);
      // first request if for the source
      requestUpdateNewListOrder({
        ...board.lists[source.index],
        newOrder: board.lists[destination.index].order,
      });
      // second request is for the destination
      requestUpdateNewListOrder({
        ...board.lists[destination.index],
        newOrder: board.lists[source.index].order,
      });
    }
    //console.log('result: ', result);
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="root-container" style={board.isOpen ? styles : {}}>
        <Navbar />
        <main className="main">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/:username/dashboard" component={Dashboard} />
            <Route path="/board/:boardTitle" component={Board} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </DragDropContext>
  );
};

Root.propTypes = {
  board: PropTypes.shape({
    isOpen: PropTypes.bool,
    id: PropTypes.number,
    title: PropTypes.string,
    background: PropTypes.string,
    ownerId: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  requestUpdateNewListOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = (dispatch) => ({
  requestUpdateNewListOrder: (list) => dispatch(requestUpdateListOrder(list)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
