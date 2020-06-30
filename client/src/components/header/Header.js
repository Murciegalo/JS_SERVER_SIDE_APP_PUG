import React from 'react'
import './header.style.scss'
import {Link,withRouter} from 'react-router-dom'
import Logo from '../../assets/logo-white.png'
import {connect} from 'react-redux'
import {logoutStart} from '../../redux/users/user.action'
import {createStructuredSelector} from 'reselect'
import {grabProfile} from '../../redux/users/user.selectors'
const Header = ({userDb,logoutStart,history}) => {
  const handleLogout = e => {
    e.preventDefault()
    history.push('/login')
    logoutStart()
  }
  return userDb !== null ?
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" to='/'>All tours</Link>
      </nav>
      <div className="header__logo">
        <img src={Logo} alt="Natours logo"/>
      </div>
      <nav className="nav nav--user">
        <Link 
          className="nav__el nav__el--logout"
          to='/logout' 
          onClick={handleLogout} 
        >
           Log out
        </Link>
        <Link to='/me' className="nav__el">
          {userDb!== undefined && <>
            {userDb.photo !== '' && <img className="nav__user-img"
              src={require(`../../assets/users/${userDb.photo}`)} 
              alt={`${userDb.name}`} 
            />}
            <span>{userDb !== undefined &&`${userDb.name}`}</span>
            </>
          }
        </Link>
      </nav>
    </header>
    :
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" to='/'>All tours</Link>
      </nav>
      <div className="header__logo">
        <img src={Logo} alt="Natours logo"/>
      </div>
      <nav className="nav nav--user">
        <Link to='/login' className="nav__el">Log in</Link>
        <Link to='/signup' className="nav__el">Sign up</Link>
      </nav>
    </header>
}

const mapStateToProps = createStructuredSelector({
  userDb: grabProfile
})
export default withRouter(
  connect(
    mapStateToProps,
    {logoutStart}
  )(Header)
) 