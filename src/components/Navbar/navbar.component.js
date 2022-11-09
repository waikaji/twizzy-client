import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from "../../constants/actionTypes";
// import decode from "jwt-decode";
import logo from '../../assets/logo.png';
import avatar from '../../assets/user.png';
import './navbar.style.css';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSelector((state) => state.socket.socket);

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/");
    setUser(null);
    socket.disconnect();
  }

  useEffect(() => {
    // const token = user?.accessToken;
    // if (token) {
    //   const decodedToken = decode(token);
    //   if (decodedToken.exp * 1000 < new Date().getTime()) {
    //     logout();
    //   }
    // }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location])

  return (
    <header className='header'>
      <nav className='navbar'>
        <div className='menu-right'>
          <Link to="/">
            <img src={logo} alt='quizy' className='logo-img'/>
          </Link>
        </div>
        <ul className='nav__list'>
          <div className='menu-left'>
            {user?(
            <>
              <li className='nav__list-item'>
                <Link className='btn-play' to='/games/joingame'>
                  Play
                </Link>
              </li> 
              <li className='nav__list-item'>
                <Link className='btn-create' to='/myquizes'>
                  Create
                </Link>
              </li>
              <li className='nav__list-item dropdown'>
                <img src={avatar} alt='user account' className='user-img' />
                {/* Dropdown */}
                <ul className="nav__list-item-drop-1">
                  <li>
                    <Link to="/">
                      Edit Profile 
                    </Link>
                  </li>
                  <li onClick={logout}>
                    Logout
                  </li>
                </ul>
              </li>
            </>
            ):(
            <>
              <li>
                <Link to='/auth' className='nav__list-item'>
                  Log in
                </Link>
              </li>
            </>
            )}
          </div>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar;