import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = (props) => {
    let navigate = useNavigate();
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <>
            <div>
                <nav className='navbar navbar-expand-lg navbar-light bg-light d-flex justify-between p-3'>
                    <ul className='d-flex gap-20 ml-6'>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""} font-bold text-xl text-slate-700`} aria-current="page" to="/">{props.title}</Link>
                        </li>
                        {localStorage.getItem('token') !== null && <> <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">{props.home}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="about">{props.about}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/contact' ? "active" : ""}`} to="contact">{props.contact}</Link>
                        </li> </>}
                    </ul>
                    {localStorage.getItem('token') ?
                        <button onClick={handleLogout} className="btn btn-outline-success mr-2" type="submit">{props.logout}</button>
                        : <form className="d-flex mr-6 gap-3">
                            <Link to="/login" className="btn btn-outline-success mr-2" type="submit">{props.login}</Link>
                            <Link to="/signup" className="btn btn-outline-success" type="submit">{props.signup}</Link>
                        </form>}
                </nav>
            </div>
        </>
    )
}
Navbar.defaultProps = {
    title: "Title",
    home: "Home",
    about: "About",
    contact: "Contact",
    login: "Login",
    logout: "Logout",
    signup: "SignUp",
}
export default Navbar;




