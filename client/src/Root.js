/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import { closeBoardsDrawer } from './actions/boardsDrawer';
import { closeUserDrawer } from './actions/userDrawer';
import { updateResource } from './api';

const Root = ({
  board,
  updateListsOrder,
  updateCardsOrder,
  boardDrawerIsOpen,
  usersDrawerIsOpen,
  closeBoardDrawer,
  closeUsersDrawer,
}) => {
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
          minNumber = newState[0].order - 200000;
        }

        // check if there is a list after the sourceList
        if (newState[destination.index + 1]) {
          maxNumber = newState[destination.index + 1].order - 1;
        } else {
          // if the new order number of sourceList is equal to board.lists.length - 1
          maxNumber = newState[newState.length - 1].order + 200000;
        }
      } else {
        // dragging a list to the left
        if (newState[destination.index - 1]) {
          // there is a list before the destination index
          minNumber = newState[destination.index - 1].order + 1;
        } else {
          minNumber = newState[0].order - 200000;
        }

        if (newState[destination.index]) {
          // there is a list after the destination index
          maxNumber = newState[destination.index].order - 1;
        } else {
          maxNumber = newState[newState.legnth - 1].order + 200000;
        }
      }

      sourceList.order =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

      // remove from the array
      newState.splice(source.index, 1);
      // insert the list into its new position
      newState.splice(destination.index, 0, sourceList);

      // dispatch actino to the store
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
      // the card that was dragged
      const sourceCard = sourceList.cards[source.index];

      // store the neccessary properties to send to the server
      const newCard = {};
      // order must be between these two numbers
      let minNumber = null;
      let maxNumber = null;

      // source card and destination card are in the same list
      if (sourceList.id === destinationList.id) {
        // if the user drags a card to the bottom
        if (source.index < destination.index) {
          // check if there is a card before the sourceCard
          if (sourceList.cards[destination.index]) {
            minNumber = sourceList.cards[destination.index].order + 1;
          } else {
            // if the list has been place at index 0
            minNumber = sourceList.cards[0].order - 200000;
          }

          // check if there is a card after the sourceCard
          if (sourceList.cards[destination.index + 1]) {
            maxNumber = sourceList.cards[destination.index + 1].order - 1;
          } else {
            // if the new order number of sourceList is equal to board.lists.length - 1
            maxNumber =
              sourceList.cards[sourceList.cards.length - 1].order + 200000;
          }
        } else {
          // dragging a card to the top
          if (sourceList.cards[destination.index - 1]) {
            // there is a list before the destination index
            minNumber = sourceList.cards[destination.index - 1].order + 1;
          } else {
            minNumber = sourceList.cards[0].order - 200000;
          }

          if (sourceList.cards[destination.index]) {
            // there is a list after the destination index
            maxNumber = sourceList.cards[destination.index].order - 1;
          } else {
            maxNumber =
              sourceList.cards[sourceList.cards.length - 1].order + 200000;
          }
        }

        sourceCard.order =
          Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

        // get the id of the card that was dragged
        newCard.id = sourceCard.id;
        // only the order property needs to be updated
        newCard.card = { order: sourceCard.order };

        // remove from the array
        sourceList.cards.splice(source.index, 1);
        // insert the list into its new position
        sourceList.cards.splice(destination.index, 0, sourceCard);
      } else {
        // card was dragged to a different list
        // remove the card from its original list
        sourceList.cards.splice(source.index, 1);
        // get a reference to the cards before and after the new cards order
        if (destinationList.cards[destination.index - 1]) {
          // there is a list before the new card order
          minNumber = destinationList.cards[destination.index - 1].order + 1;
        } else {
          // new card was dragged to the 0th index
          minNumber = destinationList.cards[0].order - 100000;
        }

        if (destinationList.cards[destination.index]) {
          // there is a card after the new cards order
          maxNumber = destinationList.cards[destination.index].order - 1;
        } else {
          // card was dragged to the very end of the list
          maxNumber =
            destinationList.cards[destinationList.cards.length - 1].order +
            200000;
        }
        // add the dragged card to its new list
        destinationList.cards.splice(destination.index, 0, sourceCard);
      }

      sourceCard.order =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

      newCard.id = sourceCard.id;
      newCard.card = { listId: destinationList.id, order: sourceCard.order };

      // send dispatch to the store
      updateCardsOrder(newState);
      // send update card info to update it in the db
      updateResource(`${baseUrl}/${newCard.id}`, { ...newCard.card });
    }
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="root-container"
        style={board.isOpen ? styles : {}}
        onClick={(e) => {
          if (
            e.target.className !== 'boards-drawer' &&
            e.target.className !== 'boards-drawer__title' &&
            (boardDrawerIsOpen || usersDrawerIsOpen)
          ) {
            // if boards drawer is open
            if (boardDrawerIsOpen) {
              // should be closed
              closeBoardDrawer();
            }

            // if users drawer is open
            if (usersDrawerIsOpen) {
              // should be closed
              closeUsersDrawer();
            }
          }
        }}
      >
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
  boardDrawerIsOpen: PropTypes.bool.isRequired,
  usersDrawerIsOpen: PropTypes.bool.isRequired,
  closeBoardDrawer: PropTypes.func.isRequired,
  closeUsersDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  board: state.board,
  boardDrawerIsOpen: state.boardsDrawer.isOpen,
  usersDrawerIsOpen: state.userDrawer.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  updateListsOrder: (source, destination) =>
    dispatch(reorderLists(source, destination)),
  updateCardsOrder: (source, destination, draggableId) =>
    dispatch(reorderCards(source, destination, draggableId)),
  closeBoardDrawer: () => dispatch(closeBoardsDrawer()),
  closeUsersDrawer: () => dispatch(closeUserDrawer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
