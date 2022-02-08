import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import withNavigation from './WithNavigation'
import withParams from './WithParams'

class TodoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent)
    const WelcomeComponentWithParams = withParams(WelcomeComponent)
    return (
      <div className='TodoApp'>
        <Router>
          <Routes>
            <Route path='/' element={<LoginComponentWithNavigation />} />
            <Route path='/login' element={<LoginComponentWithNavigation />} />
            <Route
              path='/welcome/:name'
              element={<WelcomeComponentWithParams />}
            />
            <Route path='*' element={<ErrorComponent />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      hasLoginFailed: false,
      showSuccessMessage: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.loginClicked = this.loginClicked.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  loginClicked() {
    //walter,password!!!
    if (
      this.state.username === 'walter' &&
      this.state.password === 'password!!!'
    ) {
      this.props.navigate(`/welcome/${this.state.username}`)
      this.setState({ showSuccessMessage: true })
      this.setState({ hasLoginFailed: false })
    } else {
      this.setState({ showSuccessMessage: false })
      this.setState({ hasLoginFailed: true })
    }
  }

  render() {
    return (
      <div>
        {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
        {this.state.showSuccessMessage && <div>Login Sucessful</div>}
        User Name:{' '}
        <input
          type='text'
          name='username'
          value={this.state.username}
          onChange={this.handleChange}
        />
        Password:{' '}
        <input
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button onClick={this.loginClicked}>Login</button>
      </div>
    )
  }
}

function ErrorComponent() {
  return (
    <div>
      An Error Occurred. I don't know what to do! Contact support at
      abcd-efgh-ijkl
    </div>
  )
}

class WelcomeComponent extends Component {
  render() {
    return <div>Welcome {this.props.params.name}</div>
  }
}

export default TodoApp
