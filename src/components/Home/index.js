import './index.css'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
const Home = props => {
  
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
const onClickLogout = () => {
 const {history} = props
    Cookies.remove('jwt_token')
   
    history.replace('/login')
  }
  return (
    <div className="Home-container">
      <nav className="home-nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
      <div className="digital-container">
        <div className="image-heading-container">
          <h1>Your Flexibility, our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            className="digital-card"
            alt="digital card"
          />
        </div>
      </div>
    </div>
  )
}
export default Home
