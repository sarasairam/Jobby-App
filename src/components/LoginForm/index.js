import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const websiteLogoInForm =
  'https://assets.ccbp.in/frontend/react-js/logo-img.png'

class LoginForm extends Component {
  state = {username: '', password: '', displayMsg: false, error: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({error: errorMsg, displayMsg: true})
  }

  updateUserName = event => {
    const data = event.target.value
    this.setState({username: data})
  }

  updatePassword = event => {
    const data = event.target.value
    this.setState({password: data})
  }

  updateState = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
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

  render() {
    const {username, password, error, displayMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form onSubmit={this.updateState} className="login-form">
          <img
            src={websiteLogoInForm}
            alt="website logo"
            className="login-logo"
          />
          <label htmlFor="username">USERNAME</label>
          <input
            value={username}
            type="text"
            id="username"
            onChange={this.updateUserName}
            placeholder="username"
          />
          <br />
          <br />
          <label htmlFor="password">PASSWORD</label>
          <input
            value={password}
            type="password"
            id="password"
            onChange={this.updatePassword}
            placeholder="password"
          />
          <br />
          <br />
          <button type="submit">Login</button>
          {displayMsg && <p className="error-message">*{error}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
