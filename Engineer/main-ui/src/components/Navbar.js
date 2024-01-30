import React, { Fragment, useState } from 'react';
import { Link, redirect, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
// import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    // const [redirect, setRedirect] = useState(false);

    // const logout_user = () => {
    //     logout();
    //     setRedirect(true);
    // };

    const guestLinks = () => (
        <Fragment>
            <li className='nav-item'>
                <Link className='nav-link' to='/teacher/auth'>Войти</Link>
            </li>
            <li className='nav-item'>
                <Link className='nav-link' to='/teacher/register'>Зарегистрироваться</Link>
            </li>
        </Fragment>
    );

    const authLinks = () => (
        <li className='nav-item'>
            {/*<a className='nav-link' href='/' onClick={logout_user}>Выйти</a>*/}
        </li>
    );
    const authLinks2 = () => (
        <li className='nav-item'>
            <a className='nav-link' href='/teacher/dashboard'>Личный кабинет</a>
        </li>
    );

    return (
        <Fragment>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <Link className='navbar-brand px-2' to='/'>Proton tasks</Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link className='nav-link' to='/teacher'>Главная <span className='sr-only'></span></Link>
                        </li>
                        {guestLinks()}
                        {/*{isAuthenticated && authLinks2()}*/}
                        {/*{isAuthenticated ? authLinks() : guestLinks()}*/}
                    </ul>
                </div>
            </nav>
            {/*{redirect ? <Navigate to='/' /> : <Fragment></Fragment>}*/}
        </Fragment>
    );
};

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// });

export default Navbar;
// export default connect(mapStateToProps, { logout })(Navbar);