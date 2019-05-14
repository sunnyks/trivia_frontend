import React from 'react';
import { connect } from 'react-redux'
import Store from '../store'

class Play extends React.Component {

  componentDidMount() {
    const default_url="https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple&encode=url3986"
    //fetch question
    if (((this.props.category && this.props.difficulty)) == null) {
      fetch(default_url).then(res => res.json()).then(q => {
        console.log(q)
        Store.dispatch({type: "fillQ",
        question: q['results'][0]['question'],
        answers: q['results'][0]['incorrect_answers'],
        correct: q['results'][0]['correct_answer']})
      })
    }
    //encoding??
    //Store.dispatch
  }

  displayAnswers = () => {

  }

  submitAnswer = () => {

  }

  checkAnswer = () => {
    
  }

  render() {
  return(
    <div>
      keep track of streak
      display category
      add timer component
      add question component which contains answer choices
      <div>
        {decodeURIComponent(this.props.question)}
      </div>
      <div>
        {decodeURIComponent(this.props.answers)},
        {decodeURIComponent(this.props.correct)}
      </div>
    </div>
  )
}

}


const mapStateToProps = state => {
  return {
    category: state.category,
    difficulty: state.difficulty,
    question: state.question,
    answers: state.answers,
    correct: state.correct
    }
}


const mapDispatchToProps = dispatch => {
  return
}


export default connect(mapStateToProps, null)(Play)
