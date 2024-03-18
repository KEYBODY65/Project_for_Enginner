import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='container d-flex'>
        <div className='jumbotron mt-5'>
            <h1 className='display-4'>Это главное меню учителя на Proton tasks</h1>
            <br/>
            <p className='lead'> Пожалуйста, пройдите регистрацию при необходимости или войдите в аккаунт
            </p>
            <hr className='my-4'/>
            <Link className='btn btn-primary btn-lg' to='/teacher/auth' role='button'>Login</Link>
        </div>
    </div>
);

export default Home;