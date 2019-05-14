import React from 'react';
import { connect } from 'react-redux'

class Header extends React.Component {


  render() {
  return(
    <div>
      login/logout/home, leaderboard link, stats link
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


export default connect(mapStateToProps, null)(Header)
