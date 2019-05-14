import { createStore } from 'redux';

const initialState = {
  user: null,
  category: null,
  difficulty: null,
  question: null,
  answers: null,
  correct: null,
  all_categories: null
}

const rootReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case "fillQ": {
      return {...oldState, question: action.question, answers: action.answers, correct: action.correct}
    }
    default: {
      return oldState
    }
  }
}




export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
