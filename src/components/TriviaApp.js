

class TriviaApp extends React.Component {


  render() {
  return(
    <div>
    <Header/>
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/profile" component={withRouter(Profile)} />
      other routes (leaderboard/play)
    </Switch>
    </div>
  )
}

}
