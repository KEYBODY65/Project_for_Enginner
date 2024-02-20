import './static/Dashboard.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function CreateTask() {
    const [Group, setGroup] = useState(false);
    const [groups, setGroups] = useState([])
    const [Token, setToken] = useState('');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': Token
        }
    };

    useEffect(() => {
        axios.get('/teacher/new_group_data')
            .then(response => {
                console.log(response.data)
                setGroups(response.data.groups);
                console.log(groups())
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('/teacher/get_csrf')
            .then(res => {
                const Token = res.data.csrfToken;
                setToken(Token);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append('group_name', document.getElementById('group_name').value);

        axios.post('/teacher/new_group_data/', formData, config)
            .then(response => {
                // Обработайте ответ сервера здесь
                console.log(response.data);
            })
            .catch(error => {
                // Обработайте ошибку здесь
                console.error(error);
            });
    }

    function handleNewTaskClick() {
        setGroup(true);
    }

    function renderGroups() {
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Имя группы</span>
                        <input
                            type="text"
                            className="form-control"
                            id='group_name'
                            required
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary mt-2"/>
                </form>
            </div>
        );
    }

    return (
        <div className="container d-">
            <h2 style={{textAlign: 'center', marginTop: 20}}>Группы</h2>
            <hr className="my-4"/>
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
                {Group ? (
                    <>
                        {renderGroups()}
                    </>
                ) : (
                    <h5>
                        Нажмите <span style={{textDecorationLine: 'underline'}}>+</span>, чтобы создать группу
                    </h5>
                )}
                <div className='d-block'>
                    {groups.length > 0 ? ( // Проверка наличия групп в списке
                        <ul>
                            {groups.map((group) => (
                                <li key={group.id}>
                                    <a href="/teacher/dashboard/group">{group.name}</a>
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