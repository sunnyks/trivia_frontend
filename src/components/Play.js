import React from 'react';
import { connect } from 'react-redux'
import Store from '../store'
import { Button, Dropdown } from 'semantic-ui-react'

class Play extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      score: false
    }
  }

  componentDidMount() {
    // fetch and store session token so users arent presented the same question twice
    fetch('https://opentdb.com/api_token.php?command=request').then(res => res.json()).then((sessionID) => {
      Store.dispatch({type: "fillSessionID", sessionID: sessionID['token']})
    })
  }

  selectCategory = (e, value) => {
    console.log(e.target.value)
    console.log(value)
    // debugger
    Store.dispatch({type: "selectCat", category: value.value})
  }

  buildURL = () => {
    //put together url
    //only call this function at the beginning and when streak reaches certain #s
    // implement base 64 encoding
    const default_url="https://opentdb.com/api.php?amount=1&category=9&difficulty=medium&type=multiple&encode=url3986"
    const qurl=`https://opentdb.com/api.php?amount=1&category=${this.props.category}&difficulty=${this.props.difficulty}&type=multiple&encode=url3986&token=${this.props.sessionID}`
    console.log(qurl)
    return qurl
  }

  startGame = () => {
    if (this.props.category === null) return
    Store.dispatch({type: "start"})
    this.setState({score: false})
    this.fetchQ()
  }

  fetchQ = () => {
    fetch(this.buildURL()).then(res => res.json()).then(q => {
      // refactor this
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
    // if (this.props.answers === null) return
    const correct_index = Math.floor(Math.random() * (4))
    console.log(correct_index)
    const answer_choices = this.props.answers
    console.log(answer_choices)
    if (answer_choices.indexOf(this.props.correct) === -1) {
    answer_choices.splice(correct_index, 0, this.props.correct)
    }
    console.log(this.props.answers)
    // debugger
    return this.props.answers.map((ans) => {
      return <div class="gameAnswer"><Button size='massive' onMouseDown={e => e.preventDefault()} onClick={() => this.submitAnswer(ans)}>{decodeURIComponent(ans)}</Button></div>
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
      this.setState({score: this.props.streak})
      Store.dispatch({type: "incorrect"})
      fetch(`https://opentdb.com/api_token.php?command=reset&token=${this.props.sessionID}`).then(res => res.json()).then(console.log)

      // post results to database
    }
  }

  postScore = () => {

  }

  categoryOptions = () => {
    return this.props.all_categories.map(cat => {
      return {key: cat.name, text: cat.name, value: cat.id}
    })
  }

  listCategories = () => {
    return this.props.all_categories.map((cat) => {
      return <option value={cat.id}>{cat.name}</option>
    })
  }

  render() {

  return(
    <div>
      <div class="gameOptions">
      { this.props.all_categories ?
      <Dropdown
        placeholder='Select Category'
        selection
        options={this.categoryOptions()}
        onChange={this.selectCategory} value={this.props.category}
      /> : null }
        <Button onClick={() => this.startGame()}> START! </Button>
      </div>
      <div class="gameStatus">
        <h1>Streak: {this.props.streak}</h1>
        {/* add timer component */}
      </div>
      <div class="gameQuestion">
        <p>{this.props.question ? decodeURIComponent(this.props.question) : "Pick a category!"}</p>
      </div>
      <div class="gameAnswers">
        {/*{decodeURIComponent(this.props.answers)},
        {decodeURIComponent(this.props.correct)}*/}
        <Button.Group vertical>
          {this.props.answers ? this.displayAnswers() : null}
        </Button.Group>
        {this.state.score ? `Your score was ${this.state.score}! Come back when the leaderboards are up for a shot at eternal glory!` : null}
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
