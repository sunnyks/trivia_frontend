import React from 'react';
import { connect } from 'react-redux'

class Leaderboard extends React.Component {


  render() {
  return(
    <div>
      Leaderboard {/*(overall & sort by categories)*/}
      coming soon
    </div>
  )
}

}


const mapStateToProps = state => {
  return {
    }
}


const mapDispatchToProps = dispatch => {
  return
}


export default connect(mapStateToProps, null)(Leaderboard)
