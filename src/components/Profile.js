import React from 'react';
import { connect } from 'react-redux'

class Profile extends React.Component {


  render() {
  return(
    <div>
      (if logged in) Display User Stats (else redirect to login)
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


export default connect(mapStateToProps, null)(Profile)
