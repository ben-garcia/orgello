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

  // send requests to update the lists order in the db
  // NOTE: it's a better user experience to update the UI, as a reponse to
  // use input, and then send the request.
  // Having the request handled by a saga makes for bad UI, as there is a
  // noticable period when the user moves a list to when the UI changes
  const onDragEnd = useCallback((result) => {
    const { source, destination, type } = result;
    // baseUrl is based on what resource type is being updated
    const baseUrl =
      type === 'LIST'
        ? 'http://localhost:9000/lists'
        : 'http://localhost:9000/cards';

    if (destination && type === 'LIST' && source.index !== destination.index) {
      const newState = [...board.lists];
      // get a reference of the list in the array
      const sourceList = newState[source.index];
      // order must be between these two numbers
      let minNumber = null;
      let maxNumber = null;

      // if the user drags a list to the right
      if (source.index < destination.index) {
        // check if there is a list before the sourceList
        if (newState[destination.index]) {
          minNumber = newState[destination.index].order + 1;
        } else {
          // if the list has been place at index 0
          minNumber = newState[0].order - 100000;
        }

        // check if there is a list after the sourceList
        if (newState[destination.index + 1]) {
          maxNumber = newState[destination.index + 1].order - 1;
        } else {
          // if the new order number of sourceList is equal to board.lists.length - 1
          maxNumber = newState[newState.length - 1].order + 200000;
        }
      } else {
        console.log('before ', newState[destination.index - 1]);
        console.log('after ', newState[destination.index]);
        // dragging a list to the left
        if (newState[destination.index - 1]) {
          // there is a list before the destination index
          minNumber = newState[destination.index - 1].order + 1;
        }

        if (newState[destination.index]) {
          // there is a list after the destination index
          maxNumber = newState[destination.index].order - 1;
        }
      }

      sourceList.order =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

      // remove from the array
      newState.splice(source.index, 1);
      // insert the list into its new position
      newState.splice(destination.index, 0, sourceList);

      updateListsOrder(newState);

      // update the list in the db
      updateResource(`${baseUrl}/${sourceList.id}`, {
        order: sourceList.order,
      });
    } else if (
      destination &&
      type === 'CARD' &&
      // card shouldn't be dragged to its original index in the same list.
      (source.droppableId !== destination.droppableId ||
        source.index !== destination.index)
    ) {
      const newState = [...board.lists];
      const sourceList = newState.find(
        (l) => l.id === Number(source.droppableId.split('-')[1])
      );
      const destinationList = newState.find(
        (l) => l.id === Number(destination.droppableId.split('-')[1])
      );

      const newCard = {};

      if (sourceList.id === destinationList.id) {
        // source card and destination card are in the same list
        const activeList = [...board.lists].find((l) => l.id === sourceList.id);
        const destinationCard = activeList.cards[destination.index];
        const activeCard = activeList.cards.splice(source.index, 1)[0];
        if (source.index < destination.index) {
          // when destination index is greater then
          // card order must be greater than destination
          activeCard.order = destinationCard.order + 100;
        } else {
          // otherwise it's less
          activeCard.order = destination.order - 100;
        }
        // add the card in it's new place
        activeList.cards.splice(destination.index, 0, activeCard);
        // card object that will be used to update the card in the db
        newCard.id = activeCard.id;
        // since the card was moved inside the same list
        // there is not need to include the listId
        newCard.card = {
          order: activeCard.order,
        };
      } else {
        const destinationCard = destinationList.cards[destination.index];
        // remove from the source list
        const activeCard = sourceList.cards.splice(source.index, 1)[0];
        if (destinationList.cards.length > destination.index) {
          // index of destination cannot be greater than the length of cards in
          // the list - 1
          activeCard.order = destinationCard.order - 100;
        } else if (destinationList.cards.length === destination.index) {
          // make sure that the destination lists has at least one card
          if (destinationList.cards.length > 0) {
            // card should be placed at the end on the list
            activeCard.order =
              destinationList.cards[destinationList.cards.length - 1].order +
              100;
          }
        }
        // add the card to the proper list
        destinationList.cards.splice(destination.index, 0, activeCard);
        // card object that will be used to update the card in the db
        newCard.id = activeCard.id;
        newCard.card = {
          order: activeCard.order,
          listId: destinationCard.listId,
        };
      }
      // dipatch the action with the new state
      // creating the new state here to make the api call
      updateCardsOrder(newState);
      // call the api
      updateResource(`${baseUrl}/${newCard.id}`, { ...newCard.card });
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
