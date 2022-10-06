import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PostAddIcon from '@mui/icons-material/PostAdd';

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const Navigate = useNavigate();
    const renderLinks = () => {
        if (state) {
            return (
                <nav className="navbar navbar-expand-lg sticky-top bg-light shade">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to={state ? '/' : '/signin'}><img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="insta-icon" /></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/"><OtherHousesOutlinedIcon fontSize='large' sx={{
                                        margin: "auto 1rem"
                                    }} /></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile"><AccountCircleRoundedIcon fontSize='large' sx={{
                                        margin: "auto 1rem"
                                    }} /></Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/createpost"><PostAddIcon fontSize='large' sx={{
                                        margin: "auto 1rem"
                                    }} /></Link>
                                </li>
                                <li className='nav-item'>
                                    <button style={navStyle} className='btn' onClick={() => {
                                        setTimeout(() => {
                                            localStorage.clear();
                                            dispatch({ type: "CLEAR" });
                                            Navigate('/signin')
                                        }, 1000)
                                    }}><i className="fa-solid fa-right-from-bracket fa-xl"></i> LOGOUT</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>)
        }
    }
    return (
        <section className='mb-5'>
            {renderLinks()}
            <Outlet />
        </section>
    );
}

const navStyle = {
    border: "none",
    color: "red",
    marginTop: "0.5rem"
}
export default Navbar;
