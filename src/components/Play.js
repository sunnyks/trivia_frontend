import React from 'react';
import { connect } from 'react-redux'
import Store from '../store'

class Play extends React.Component {

//   constructor(props) {
//   super(props)
//   this.state = {
//     question: null,
//     answers: null,
//     correct: null,
//     sessionID: null,
//     category: 9,
//     difficulty: "easy",
//     streak: 0,
//     questionURL: null
//   }
// }

  constructor(props) {
    super(props)
    this.state = {
      playing: false
    }
  }

  componentDidMount() {
    // fetch and store session token so users arent presented the same question twice
    fetch('https://opentdb.com/api_token.php?command=request').then(res => res.json()).then((sessionID) => {
      Store.dispatch({type: "fillSessionID", sessionID: sessionID['token']})
    })
    //Base64 encoding?
  }

  selectCategory = (e) => {
    console.log(e.target.value)

    Store.dispatch({type: "selectCat", category: e.target.value})
  }

  buildURL = () => {
    //put together url
    //only call this function at the beginning and when streak reaches certain #s
    const default_url="https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple&encode=url3986"
    const qurl=`https://opentdb.com/api.php?amount=1&category=${this.props.category}&difficulty=${this.props.difficulty}&type=multiple&encode=url3986&token=${this.props.sessionID}`
    return qurl
  }

  fetchQ = () => {
    fetch(this.buildURL()).then(res => res.json()).then(q => {
      console.log(q)
      console.log(q['results'][0]['question'])
      console.log(q['results'][0]['incorrect_answers'])
      console.log(q['results'][0]['correct_answer'])
      Store.dispatch({type: "fillQ",
      question: q['results'][0]['question'],
      answers: q['results'][0]['incorrect_answers'],
      correct: q['results'][0]['correct_answer']})
      // this.setState({
      //   question: q['results'][0]['question'],
      //   answers: q['results'][0]['incorrect_answers'],
      //   correct: q['results'][0]['correct_answer']})
      })
  }

  displayAnswers = () => {
    if (this.props.answers === null) return
    const correct_index = Math.floor(Math.random() * (4))
    console.log(correct_index)
    const answer_choices = this.props.answers
    console.log(answer_choices)
    const all_answers = answer_choices.splice(correct_index, 0, this.props.correct)
    console.log(all_answers)
    console.log(this.props.answers)
    // debugger
    return this.props.answers.map((ans) => {
      return <div><button onClick={() => this.submitAnswer(ans)}>{decodeURIComponent(ans)}</button></div>
    })

  }

  submitAnswer = (ans) => {
    if (ans === this.props.correct) {
      console.log("correct!")
      // const new_streak = this.state.streak + 1
      // refactor
      const new_streak = this.props.streak + 1
      // use switch here?
      var diff = "easy"
      if (new_streak >= 5) {
        diff = "medium"
      }
      if (new_streak >= 10) {
        diff = "hard"
      }
      Store.dispatch({type: "correct", streak: new_streak, difficulty: diff})
      this.fetchQ()

      // reset timer once implemented
      // fetch new question
      // increase difficulty

      console.log("Current Streak:" + new_streak)
    }
    else {
      console.log("wrong!")
      // refactor
      Store.dispatch({type: "incorrect"})

      // post results to database
    }
  }

  listCategories = () => {
    return this.props.all_categories.map((cat) => {
      return <option value={cat.id}>{cat.name}</option>
    })
  }

  render() {

  return(
    <div>
      keep track of streak
      display category
      add timer component
      add question component which contains answer choices
      <div>
        <select id="category" onChange={(e)=>{this.selectCategory(e)}} value={this.props.category}>
          {this.props.all_categories ? this.listCategories() : null}
        </select>
        <button onClick={() => this.fetchQ()}> START! </button>
      </div>
      <div>
        <h1>Streak: {this.props.streak}</h1>
      </div>
      <div>
        <h1>{this.props.question ? decodeURIComponent(this.props.question) : "Pick a category!"}</h1>
      </div>
      <div>
        {decodeURIComponent(this.props.answers)},
        {decodeURIComponent(this.props.correct)}
        {this.props.answers ? this.displayAnswers() : null}
      </div>
    </div>
  )
}

}


const mapStateToProps = state => {
  return {
    all_categories: state.all_categories,
    category: state.category,
    difficulty: state.difficulty,
    streak: state.streak,
    question: state.question,
    answers: state.answers,
    correct: state.correct,
    sessionID: state.sessionID
    }
}


const mapDispatchToProps = dispatch => {
  return
}


export default connect(mapStateToProps, null)(Play)
