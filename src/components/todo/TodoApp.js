import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import withNavigation from './WithNavigation'
import withParams from './WithParams'
import AuthenticationService from './AuthenticationService'

class TodoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent)
    const WelcomeComponentWithParams = withParams(WelcomeComponent)
    const HeaderComponentWithNavigation = withNavigation(HeaderComponent)
    return (
      <div className='TodoApp'>
        <Router>
          <HeaderComponentWithNavigation />
          <Routes>
            <Route path='/' element={<LoginComponentWithNavigation />} />
            <Route path='/login' element={<LoginComponentWithNavigation />} />
            <Route
              path='/welcome/:name'
              element={<WelcomeComponentWithParams />}
            />
            <Route path='/todos' element={<ListTodosComponent />} />
            <Route path='/logout' element={<LogoutComponent />} />
            <Route path='*' element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </Router>
      </div>
    )
  }
}

class HeaderComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
    //console.log(isUserLoggedIn)
    return (
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
          <div>
            <a href='https://github.com/Waltercito1' className='navbar-brand'>
              My Github
            </a>
          </div>
          <ul className='navbar-nav'>
            <li>
              <Link className='nav-link' to='/welcome/home'>
                Home
              </Link>
            </li>
            <li>
              <Link className='nav-link' to='/todos'>
                Todos
              </Link>
            </li>
          </ul>
          <ul className='navbar-nav navbar-collapse justify-content-end'>
            <li>
              <Link className='nav-link' to='/login'>
                Login
              </Link>
            </li>
            <li>
              <Link className='nav-link' to='/logout'>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

class FooterComponent extends Component {
  render() {
    return (
      <footer className='footer'>
        <span className='text-muted'>All Rights Reserved 2022</span>
      </footer>
    )
  }
}

class LogoutComponent extends Component {
  render() {
    return (
      <>
        <h1>You are logged out</h1>
        <div className='container'>Thank You for Using Our Application.</div>
      </>
    )
  }
}

class ListTodosComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {
          id: 1,
          description: 'Learn to Dance',
          done: false,
          targetDate: new Date(),
        },
        {
          id: 2,
          description: 'Become an Expert at React',
          done: false,
          targetDate: new Date(),
        },
        {
          id: 3,
          description: 'Visit India',
          done: false,
          targetDate: new Date(),
        },
      ],
    }
  }

  render() {
    return (
      <div>
        <h1>List Todos</h1>
        <div className='container'>
          <table className='table'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Is Completed?</th>
                <th>Target Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{todo.targetDate.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      AuthenticationService.registerSuccessfullLogin()
      this.props.navigate(`/welcome/${this.state.username}`)
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
