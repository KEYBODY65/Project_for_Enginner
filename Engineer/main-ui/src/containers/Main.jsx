import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => (
    <div className='container' style={{display: 'flex', justifyContent: 'center'}}>
        <div className='jumbotron mt-5' style={{textAlign: 'center'}}>
            <h1 className='display-4' >Добро пожаловать на Proton tasks!</h1>
            <br/>
            <p className='lead'>Это удобная учебная система для написаний самостоятельных, контрольных работ, а также
                для составления собственных вариантов работ
                с удобным интерфейсом
            </p>
            <br/>
            <p> Выберите свою роль</p>
            <p className='lead'>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <a className='btn btn-primary btn-lg' href='/student/student_login' role='button'>Ученик</a>
                <a className='btn btn-primary btn-lg' href='/teacher/auth' role='button'>Учитель</a>
            </div>
            </p>
            <hr className='my-4' />
        </div>
    </div>
);

export default Main;