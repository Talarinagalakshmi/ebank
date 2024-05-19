import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }
  onChanheUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChanhepassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, password} = this.state
    const userDetails = {user_id: userId, pin:password}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserIdFiled = () => {
    const {userId} = this.state
    return (
      <>
        <label className="userId" htmlFor="userId">
          User ID
        </label>
        <input
          id="userId"
          value={userId}
          type="text"
          className="user-input"
          onChange={this.onChanheUserId}
        />
      </>
    )
  }

  renderPassWord = () => {
    const {password} = this.state
    return (
      <>
        <label className="userId" htmlFor="password">
          PIN
        </label>
        <input
          id="password"
          value={password}
          type="password"
          className="user-input"
          onChange={this.onChanhepassword}
        />
      </>
    )
  }
  render() {
    const {showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="website-login"
            alt="website login"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <h1 className="">Welcome Back!</h1>
            <div className="username-input-container">
              {this.renderUserIdFiled()}
            </div>
            <div className="username-input-container">
              {this.renderPassWord()}
            </div>
            <button type="submit" className="button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
