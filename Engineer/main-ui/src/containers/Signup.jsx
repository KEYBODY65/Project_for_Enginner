import {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth.jsx';
import Cookies from "universal-cookie";



const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        email: '', name: '', surname: '', password: '', re_password: '',
    });
    const cookies = new Cookies();


    const { name, surname, email, password, re_password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(name, surname, email, password, cookies.get('csrftoken'));
            setAccountCreated(true);
        }
    };


if (isAuthenticated) {
    return <Navigate to='/teacher/dashboard' />
}

if (accountCreated) {
    return <Navigate to='/teacher/auth' />
}

    return (<div className='container mt-5'>
        <h1>Регистрация</h1>
        <p>Создай свой аккаунт</p>
        <form onSubmit={e => onSubmit(e)}>
            <input type="hidden" name="csrfmiddlewaretoken" value={cookies.get('csrftoken')}/>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='email'
                    placeholder='Эл. Почта'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Имя'
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Фамилия'
                    name='surname'
                    value={surname}
                    onChange={e => onChange(e)}
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='password'
                    placeholder='Пароль'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    minLength='6'
                    required
                />
            </div>
            <div className='form-group'>
                <input
                    className='form-control'
                    type='password'
                    placeholder='Повторите пароль'
                    name='re_password'
                    value={re_password}
                    onChange={e => onChange(e)}
                    minLength='6'
                    required
                />
            </div>
            <button className='btn btn-primary mt-2' type='submit'>Зарегистрироваться</button>
        </form>
        <p className='mt-3'>
            Уже есть аккаунт? <Link to='/teacher/auth'>Войти в аккаунт</Link>
        </p>
    </div>);
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);