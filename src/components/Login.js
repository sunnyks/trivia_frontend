import React from 'react';
import { connect } from 'react-redux'

class Login extends React.Component {


  render() {
  return(
    <div>
      Login/Signup
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


export default connect(mapStateToProps, null)(Login)
