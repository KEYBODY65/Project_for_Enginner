import {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginStudent} from '../../actions/auth.jsx'
import Cookies from "universal-cookie";

// eslint-disable-next-line react/prop-types,react-refresh/only-export-components
function LoginStudent({loginStudent, isStudentAuthenticated}) {
    const [token, setToken] = useState('')

    useEffect(() => {
        const cookies = new Cookies();
        setToken(cookies.get('csrftoken'))
    }, [])

    const onSubmit = e => {
        e.preventDefault();
        let login = document.getElementById('login').value;
        let password = document.getElementById('password').value;
        loginStudent(login, password, token)
    };


    if (isStudentAuthenticated) {
        return <Navigate to='/student/dashboard'/>
    }

    return (
        <div className='container mt-5'>
            <h1>Вход</h1>
            <p> Попросите у своего учителя логин и пароль</p>
            <hr className="my-4"/>
            <p>Войти в аккаунт</p>
            <form name='login' onSubmit={e => onSubmit(e)}>
                <input type="hidden" name="csrfmiddlewaretoken" value={token}/>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='login'
                        name='login'
                        required
                        id='login'
                    />
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        id='password'
                        minLength='6'
                    />
                </div>
                <button className='btn btn-primary mt-2' type='submit'>
                    Войти
                </button>
                <div style={{
                    display: "none",
                    color: 'red'
                }} id={'incorrectValue'}>
                    <p> Неправильный Логин или пароль</p>
                </div>
            </form>
        </div>
    );
}


const mapStateToProps = state => ({
    isStudentAuthenticated: state.auth.isStudentAuthenticated
});

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, {loginStudent})(LoginStudent);
