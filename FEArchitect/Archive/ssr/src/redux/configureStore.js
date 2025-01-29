import { createStore } from 'redux';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const configureStore = (initialState) => createStore(reducer, initialState);

export default configureStore;
