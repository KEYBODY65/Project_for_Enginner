import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
// import { connect } from 'react-redux';
// import { signup } from '../actions/auth';
import axios from 'axios';


// isAuthenticated
const Signup = () => {
    const signup = (name, surname, email, password) => async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };

        console.log(2);
        const body = JSON.stringify({name, surname, email, password, csrfToken});
        console.log(body);
        try {
            const res = await axios.post('/teacher/auth/register_data/', body, config);
            console.log(1);
            dispatch({
                payload: res.data
            });
        } catch (err) {
            dispatch({});
        }
    };


// const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        email: '', name: '', surname: '', password: '', re_password: '', csrfToken: '',
    });

    useEffect(() => {
        axios
            .get('/teacher/get_csrf')
            .then(res => {
                const csrfToken = res.data.csrfToken;
                setFormData({...formData, csrfToken});
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const {csrfToken, name, surname, email, password, re_password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            try {
                signup(name, surname, email, password);
            } catch (error) {
                console.error(error);
            }
        }
    };


// if (isAuthenticated) {
//     return <Navigate to='/teacher' />
// }

// if (accountCreated) {
//     return <Navigate to='/teacher/auth' />
// }

    return (<div className='container mt-5'>
        <h1>Регистрация</h1>
        <p>Создай свой аккаунт</p>
        <form onSubmit={e => onSubmit(e)}>
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken}/>
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


// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// });

export default Signup;
// export default connect(mapStateToProps, { signup })(Signup);