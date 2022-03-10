class AthenticationService {
  registerSuccessfulLogin(username, password) {
    console.log('redisterSuccessfullLogin')
    sessionStorage.setItem('authenticatedUser', username)
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser')
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser')
    if (user === null) return false
    return true
  }
}

export default new AthenticationService()
