import './static/Dashboard.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function CreateTask() {
  const [Groups, setGroups] = useState(false);
  const [Group, setGroup] = useState("");
  const [SendGroup, setSendGroup] = useState({
    Group: ''
  });
  const [submittedGroup, setSubmittedGroup] = useState([]); // Сохранение введенных данных в отдельной переменной
  const [Token, setToken] = useState('');

  const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': Token
        }
    };

   useEffect(() => {
   axios.get('/teacher/get_csrf')
      .then(res => {
        const Token = res.data.csrfToken;
        setToken(Token);
      })
      .catch(err => {
        console.error(err);
      });
    const savedGroup = localStorage.getItem('submittedGroup');

    if (savedGroup) {
      try {
          const parsedGroup = JSON.parse(savedGroup);
          setSubmittedGroup(parsedGroup);
        } catch (error) {
          console.error("Ошибка при преобразовании значения 'submittedGroup':", error);
        }
    }
  }, []);

  function onChange(e) {
    setGroup(e.target.value);
    setSendGroup(prevState => ({
        ...prevState,
        Group: e.target.value
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setSubmittedGroup([...submittedGroup, Group]);

    console.log(SendGroup);
    localStorage.setItem('submittedGroup', JSON.stringify([...submittedGroup, Group]));

    e.preventDefault();
    axios.post('/teacher/dashboard/groups', SendGroup, config)
      .then(response => {
        // Обработайте ответ сервера здесь
        console.log(response.data);
      })
      .catch(error => {
        // Обработайте ошибку здесь
        console.error(error);
      });
      setGroup(""); // Очищаем поле после отправки

  }

  function handleNewTaskClick() {
    setGroups(true);
  }

  function renderGroups() {
    return (
      <div>
        <form onSubmit={onSubmit}>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Options
            </label>
            <select className="form-select" id="inputGroupSelect01" onChange={onChange}>
              <option selected>Предмет</option>
              <option value="math">Алгебра</option>
              <option value="phys">Физика</option>
              <option value="info">Информатика</option>
              <option value="geo">Геометрия</option>
              <option value="rus lang">Русский язык</option>
              <option value="bio">Биология</option>
            </select>
          </div>
          <div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="inputGroup-sizing-default">Имя группы</span>
              <input
                type="text"
                className="form-control"
                value={Group}
                onChange={onChange}
                required
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
          <input type="submit" className="btn btn-primary mt-2" />
        </form>
      </div>
    );
  }

  return (
    <div className="container d-">
      <h2 style={{ textAlign: 'center', marginTop: 20 }}>Группы</h2>
      <hr className="my-4" />
      <div className="new_test mb-3">
        <div className="d-flex">
          <button className="btn btn-primary mt-2" onClick={handleNewTaskClick} type="button">
            +
          </button>
          <h5>Создать</h5>
        </div>
        <div>
          <h4>Ваши группы:</h4>
        </div>
      </div>
      <div className="new_test">
        {Groups ? (
          <>
            {renderGroups()}
          </>
        ) : (
          <h5>
            Нажмите <span style={{ textDecorationLine: 'underline' }}>+</span>, чтобы создать группу
          </h5>
        )}
        <div className='d-block'>
           {submittedGroup.length > 0 ? ( // Проверка наличия групп в списке
           <ul>
             {submittedGroup.map((group, index) => (
               <li key={index}>
                <a href="">{group}</a>
               </li>
             ))}
           </ul>
          ) : (
            <p>У вас пока нет групп</p>
          )}
        </div>
      </div>
    </div>
  );
}