class AthenticationService {
  registerSuccessfulLogin(username, password) {
    console.log('redisterSuccessfullLogin')
    sessionStorage.setItem('authenticatedUser', username)
  }
}

export default new AthenticationService()
