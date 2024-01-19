import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='container d-flex'>
        <div className='jumbotron mt-5'>
            <h1 className='display-4'>Добро пожаловать на Proton tasks!</h1>
            <p className='lead'>Это удобная учебная система для написаний самостоятельных, контрольных работ, а также
                для составления собственных вариантов работ
                с удобным интерфейсом
            </p>
            <hr className='my-4' />
            <p> Нажми, чтоб войти в аккаунт</p>
            <Link className='btn btn-primary btn-lg' to='/teacher/auth' role='button'>Login</Link>
        </div>
    </div>
);

export default Home;