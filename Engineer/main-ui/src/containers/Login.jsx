import {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions/auth.jsx'
import Cookies from "universal-cookie";

function Login({login, isAuthenticated}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const cookies = new Cookies();

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        login(email, password, cookies.get('csrftoken'))
    };
    if (isAuthenticated) {
         return <Navigate to='/teacher/dashboard'/>
    }

    return (
        <div className='container mt-5'>
            <h1>Вход</h1>
            <p>Войти в аккаунт</p>
            <form name='login' onSubmit={e => onSubmit(e)}>
                <input type="hidden" name="csrfmiddlewaretoken" value={cookies.get('csrftoken')}/>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='email'
                        name='email'
                        required
                        id='email'
                        //                        pattern='[a-z0-9._%+-]+@[a-z0-9._]+.[a-z]{2,4}$'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        required
                        //                        pattern='[a-z0-9._%+-]+@[a-z0-9._]+.[a-z]{2,4}$'
                        value={password}
                        id='password'
                        minLength='6'
                        onChange={e => onChange(e)}
                    />
                </div>
                {/*{err && <span style={{color: 'red'}}>{err}</span>}*/}
                <button className='btn btn-primary mt-2' type='submit'>
                    Войти
                </button>
            </form>
            <p className='mt-3'>
                Нет аккаунта? <Link to='/teacher/register'>Регистрация</Link>
            </p>
        </div>
    );
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
