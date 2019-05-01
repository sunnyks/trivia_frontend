import { createStore } from 'redux';

const initialState = {}

const rootReducer = (oldState = initialState, action) => {
  switch (action.type) {
  }
}




export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
