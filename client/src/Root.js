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

import { reorderLists } from './actions/lists';
import { reorderCards } from './actions/cards';
import { updateResource } from './api';

const Root = ({ board, updateListsOrder, updateCardsOrder }) => {
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
    const { source, destination, type, draggableId } = result;
    // baseUrl is based on what resource type is being updated
    const baseUrl =
      type === 'LIST'
        ? 'http://localhost:9000/lists'
        : 'http://localhost:9000/cards';

    if (destination && type === 'LIST' && source.index !== destination.index) {
      updateListsOrder(
        board.lists[source.index],
        board.lists[destination.index]
      );
      // send requests to update the lists order in the db
      // NOTE: it's a better user experience to update the UI, as a reponse to
      // use input, and then send the request.
      // Having the request handled by a saga makes for bad UI, as there is a
      // noticable period when the user moves a list to when the UI changes

      // request for the source
      updateResource(`${baseUrl}/${board.lists[source.index].id}`, {
        order: board.lists[source.index].order,
      });
      // requets for the destination
      updateResource(`${baseUrl}/${board.lists[destination.index].id}`, {
        order: board.lists[destination.index].order,
      });
    } else if (
      destination &&
      type === 'CARD' &&
      // card shouldn't be dragged to its original index in the same list.
      (source.droppableId !== destination.droppableId ||
        source.index !== destination.index)
    ) {
      // console.log('source: ', source);
      // console.log('destination: ', destination);
      // console.log('draggableId: ', draggableId);
      const sourceList = board.lists.find(
        (l) => l.id === Number(source.droppableId.split('-')[1])
      );
      // console.log('sourceList ', sourceList);
      const destinationList = board.lists.find(
        (l) => l.id === Number(destination.droppableId.split('-')[1])
      );
      // console.log('destinationList ', destinationList);
      const card = sourceList.cards[source.index];
      // console.log('sourceCard ', card);

      updateCardsOrder(
        { list: sourceList, index: source.index },
        { list: destinationList, index: destination.index }
      );
    }
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
  updateListsOrder: PropTypes.func.isRequired,
  updateCardsOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = (dispatch) => ({
  updateListsOrder: (source, destination) =>
    dispatch(reorderLists(source, destination)),
  updateCardsOrder: (source, destination, draggableId) =>
    dispatch(reorderCards(source, destination, draggableId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
