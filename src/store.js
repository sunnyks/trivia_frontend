import { createStore } from 'redux';

const initialState = {
  user: null,
  all_categories: null
}

const rootReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case "fillCat": {
      return {...oldState, all_categories: action.all_categories}
    }
    default: {
      return oldState
    }
  }
}




export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
