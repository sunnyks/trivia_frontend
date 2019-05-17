import React from 'react';
import { connect } from 'react-redux'
import Store from '../store'

class Play extends React.Component {

  constructor(props) {
  super(props)
  this.state = {
    question: null,
    answers: null,
    correct: null,
    sessionID: null,
    category: null,
    difficulty: null,
    streak: 0,        //refactor streak!!!
    questionURL: null
  }
}

  componentDidMount() {
    // maybe don't fetch question on mount and instead add a "START" button
    const default_url="https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple&encode=url3986"
    //fetch question
    if (((this.props.category && this.props.difficulty)) == null) {
      fetch(default_url).then(res => res.json()).then(q => {
        console.log(q)
        console.log(q['results'][0]['question'])
        console.log(q['results'][0]['incorrect_answers'])
        console.log(q['results'][0]['correct_answer'])
        // Store.dispatch({type: "fillQ",
        // question: q['results'][0]['question'],
        // answers: q['results'][0]['incorrect_answers'],
        // correct: q['results'][0]['correct_answer']})
        this.setState({
          question: q['results'][0]['question'],
          answers: q['results'][0]['incorrect_answers'],
          correct: q['results'][0]['correct_answer']})
        })
    }
    //Base64 encoding?
  }

  selectCategory = () => {

  }

  buildURL = () => {
    //put together url
    //only call this function at the beginning and when streak reaches certain #s
  }

  fetchQ = () => {

  }

  displayAnswers = () => {
    if (this.state.answers === null) return
    const correct_index = Math.floor(Math.random() * (4))
    console.log(correct_index)
    const answer_choices = this.state.answers
    console.log(answer_choices)
    const all_answers = answer_choices.splice(correct_index, 0, this.state.correct)
    console.log(all_answers)
    console.log(this.state.answers)
    // debugger
    return this.state.answers.map((ans) => {
      return <div><button onClick={() => this.submitAnswer(ans)}>{decodeURIComponent(ans)}</button></div>
    })

  }

  submitAnswer = (ans) => {
    if (ans === this.state.correct) {
      console.log("correct!")
      // const new_streak = this.state.streak + 1
      // refactor
      // Store.dispatch({type: "incStreak", newStreak: new_streak})


      // reset timer once implemented
      // fetch new question
      console.log("Current Streak:" + this.state.streak)
    }
    else {
      console.log("wrong!")
      // refactor
      // Store.dispatch({type: "resetStreak"})

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
        <select id="chartdata" onChange={(e)=>{this.selectCategory(e)}} value={"idk"}>
          {this.props.all_categories ? this.listCategories() : null}
        </select>
        <button onClick={this.fetchQ()}> START! </button>
      </div>
      <div>
        {decodeURIComponent(this.state.question)}
      </div>
      <div>
        {decodeURIComponent(this.state.answers)},
        {decodeURIComponent(this.state.correct)}
        {this.state.answers ? this.displayAnswers() : null}
      </div>
    </div>
  )
}

}


const mapStateToProps = state => {
  return {
    all_categories: state.all_categories
    }
}


const mapDispatchToProps = dispatch => {
  return
}


export default connect(mapStateToProps, null)(Play)
