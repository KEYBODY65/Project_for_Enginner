import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [name, setName] = useState();

  useEffect(() => {
    axios
      .get('/teacher/dashboard_json')
      .then(res => {
        const name = res.data.data.groups[0].group_builder;
        setName(name);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className='container'>
      <div className='jumbotron mt-5'>
        <h1 className='display-4'>Добро пожаловать в вашу панель управления, {name}</h1>
        <p className='lead'>
          Это удобная учебная система для написания самостоятельных и контрольных работ, а также для составления
          собственных вариантов заданий с удобным интерфейсом.
        </p>
      </div>
      <hr className='my-4' />

      <div className='c d-flex '>
        <Link to='/teacher/dashboard/groups'>
          <div className='card border-primary mb-3' style={{ maxWidth: '18rem' }}>
            <div className='card-header' style={{ height: 40 }}></div>
            <div className='card-body'>
              <h5 className='card-title'>Группы</h5>
              <p className='card-text'>Список ваших классов, добавление новых групп</p>
            </div>
          </div>
        </Link>
        <Link to='/teacher/dashboard/new_test'>
          <div className='card border-primary mb-3' style={{ maxWidth: '18rem' }}>
            <div className='card-header' style={{ height: 40 }}></div>
            <div className='card-body'>
              <h5 className='card-title'>Составление вариантов</h5>
              <p className='card-text'>Составление вариантов из списка созданных вами заданий</p>
            </div>
          </div>
        </Link>
        <Link to='/teacher/dashboard/add_task'>
          <div className='card border-primary mb-3' style={{ maxWidth: '18rem' }}>
            <div className='card-header' style={{ height: 40 }}></div>
            <div className='card-body'>
              <h5 className='card-title'>Добавить задание</h5>
              <p className='card-text'>Добавить задачу в перечень всех заданий</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}