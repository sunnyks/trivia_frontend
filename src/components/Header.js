import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends React.Component {


  render() {
  return(
    <div>
      {/*login/logout/home, leaderboard link, stats link*/}
      <Link to={'/login'}> Login </Link> | <Link to={'/play'}> Play </Link> | <Link to={'/leaderboard'}> Leaderboard </Link> 
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
