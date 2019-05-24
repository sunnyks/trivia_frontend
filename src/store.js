import { createStore } from 'redux';

const initialState = {
  user: null,
  all_categories: null,
  category: 9,
  difficulty: "easy",
  streak: 0,
  sessionID: null,
  question: null,
  answers: null,
  correct: null,
}

const rootReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case "fillCat": {
      return {...oldState, all_categories: action.all_categories}
    }
    case "start": {
      return {...oldState, streak: 0, difficulty: "easy"}
    }
    case "fillQ": {
      return {...oldState, question: action.question, answers: action.answers, correct:action.correct}
    }
    case "fillSessionID": {
      return {...oldState, sessionID: action.sessionID}
    }
    case "correct": {
      // refactor into reducers
      return {...oldState, streak: action.streak, difficulty: action.difficulty}
    }
    case "incorrect": {
      return {...oldState, streak: 0, difficulty: "easy", question: "Wrong! Try again!", answers: null, correct: null}
    }
    case "selectCat": {
      return {...oldState, category: action.category, question: null, answers: null, correct: null, difficulty: "easy"}
    }
    default: {
      return oldState
    }
  }
}




export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
