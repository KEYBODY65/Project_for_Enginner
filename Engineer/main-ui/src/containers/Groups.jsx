import './static/Dashboard.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Cookies from "universal-cookie";

export default function CreateTask() {
    const [Group, setGroup] = useState(false);
    const [groups, setGroups] = useState([]);
    const [url, setUrl] = useState([]);
    const cookies = new Cookies();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        }
    };

    useEffect(() => {
        axios.get('/teacher/new_group_data')
            .then(response => {
                setGroups([]);
                const groups = response.data.groups
                const group_ids = response.data.groups_ids;
                const processedGroups = groups.map((group, index) => {
                    return {
                        name: group,
                        id: group_ids[index]
                    };
                });

                let paramsUrl = []
                group_ids.forEach(id => {
                    let url = new URL('/teacher/dashboard/groups/group', window.location.origin);
                    url.searchParams.set('id', id)
                    paramsUrl.push(url)
                })
                setUrl(paramsUrl);

                // setUrl(paramsUrl);
                setGroups(processedGroups);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    function onSubmit() {
        const formData = new FormData();

        formData.append('group_name', document.getElementById('group_name').value);

        axios.post('/teacher/new_group_data/', formData, config)
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
                            {groups.map((group, index) => (
                                <li key={index}>
                                    <a href={`${url[index]}`}>{group.name}</a>
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