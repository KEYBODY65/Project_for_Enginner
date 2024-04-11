import {Fragment, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout, logoutStudent} from '../actions/auth.jsx';

const Navbar = ({logout, logoutStudent, isAuthenticated, isStudentAuthenticated}) => {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };
    const logout_student = () => {
        logoutStudent();
        setRedirect(true);
    }

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
            <a className='nav-link' href='/' onClick={logout_student}>Выйти</a>
        </li>
    );
    const authLinks2 = () => (

            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <li className='nav-item'>
                    <a className='nav-link' href='/teacher/dashboard'>Личный кабинет</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/' onClick={logout_user}>Выйти</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/teacher/dashboard/add_student'>Добавить студента</a>
                </li>
            </div>
        )
    ;

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
                {document.location.pathname.startsWith('/teacher') &&
                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className='navbar-nav'>
                            {isAuthenticated ? authLinks2() : guestLinks()}
                        </ul>
                    </div>
                }
                {document.location.pathname.startsWith('/student') &&
                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className='navbar-nav'>
                            {isStudentAuthenticated && authLinks()}
                        </ul>
                    </div>
                }

            </nav>
            {redirect ? <Navigate to='/'/> : <Fragment></Fragment>}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isStudentAuthenticated: state.auth.isStudentAuthenticated
});
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    logoutStudent: () => dispatch(logoutStudent())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);