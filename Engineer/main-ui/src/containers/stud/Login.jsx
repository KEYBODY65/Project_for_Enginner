import {useState, useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginStudent} from '../../actions/auth.jsx'
import Cookies from "universal-cookie";
import axios from "axios";

// eslint-disable-next-line react/prop-types,react-refresh/only-export-components
function LoginStudent({loginStudent, isStudentAuthenticated}) {
    const [idStudent, setIdStudent] = useState();
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies();
        setToken(cookies.get('csrftoken'))
    }, [])

    const onSubmit = e => {
        e.preventDefault();
        let login = document.getElementById('login').value;
        let password = document.getElementById('password').value;
        loginStudent(login, password, token)
        const cookies = new Cookies();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            }
        };
        const formData = new FormData();
        formData.append('login', login);
        axios.post('/teacher/students_data/', formData, config)
            .then(res => {
                setIdStudent(res.data.student_id);
            })
    };
    useEffect(() => {
        if (JSON.parse(isStudentAuthenticated)) {
            if (idStudent) {
                let url = `/student/dashboard?id=${idStudent}`;
                navigate(url);
            }
        }
    }, [idStudent]);


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
