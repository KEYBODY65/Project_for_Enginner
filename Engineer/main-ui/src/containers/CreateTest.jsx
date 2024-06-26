import axios from 'axios';
import {useEffect, useState} from 'react';
import Cookies from "universal-cookie";

export default function Group() {
    const [Test, setTest] = useState(false);
    const [tests, setTests] = useState([]);
    const [tasks, setTasks] = useState([]);
    const cookies = new Cookies();
    const config = {
        headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRFToken': cookies.get('csrftoken')
        }
    };

    useEffect(() => {
        axios.get('/teacher/teacher_tasks_data')
            .then(response => {
                const data = response.data
                setTasks([])
                let task_ids = data.task_ids;
                let task_names = data.task_names;
                let UpdTasks = [];
                task_ids.forEach(function (id) {
                    UpdTasks.push([`${task_names[id - 1]}`, id]);
                });
                setTasks(UpdTasks);

            })
            .catch(error => {
                console.error(error);
            });
        axios.get('/teacher/add_test_data')
            .then(response => {
                const data = response.data;
                setTests([])
                let test_ids = data.tests_id;
                let tests_names = data.tests;
                let UpdTests = [];
                test_ids.forEach(id => {
                    UpdTests.push(`${tests_names[id - 1]}`);
                })
                setTests(UpdTests);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name_of_test', document.getElementById('name_of_test').value);
        let taskIds = [];

        document.querySelectorAll('input[type="checkbox"]:checked').forEach(elem => {
            taskIds.push(elem.id);
        })

        taskIds.forEach(id => {
            formData.append('task_ids[]', id);
        });
        axios.post('/teacher/add_test_data/', formData, config)
            .then(() => {
                location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    }

    function handleNewTestClick() {
        setTest(true);
    }

    function renderTest() {
        return (<div>
            <form onSubmit={onSubmit}>
                <div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">Название теста</span>
                        <input
                            type="text"
                            className="form-control"
                            required
                            id='name_of_test'
                            aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </div>
                    <div className="input-group mb-3">
                        <div className='d-block'>
                            {tasks.length > 0 ? ( // Проверка наличия заданий в списке
                                <ul style={{listStyleType: 'none'}}>
                                    {tasks.map((task) => (
                                        <li key={task.id}>
                                            <input className="form-check-input mr-3" type="checkbox"
                                                   value="" id={task[1]}/>
                                            <label className="form-check-label" htmlFor={task[1]}>
                                                <p>{task[0]}</p>
                                            </label>
                                        </li>))}
                                </ul>) : (<p>Вы не добавили задания</p>)}
                        </div>

                    </div>
                </div>
                <input type="submit" className="btn btn-primary mt-2"/>
            </form>
        </div>);
    }

    return (<div className="container d-">
        <h2 style={{textAlign: 'center', marginTop: 20}}>Составление варианта</h2>
        <hr className="my-4"/>
        <div className="new_test mb-3">
            <div className="d-flex">
                <button className="btn btn-primary mt-2" onClick={handleNewTestClick} type="button">
                    +
                </button>
                <h5>Создать вариант</h5>
            </div>
            <div>
                <h4>Созданные варианты</h4>
            </div>
        </div>
        <div className="new_test">
            {Test ? (<>
                {renderTest()}
            </>) : (<h5>
                Нажмите <span style={{textDecorationLine: 'underline'}}>+</span>, чтобы составить вариант
            </h5>)}
            <div className='d-block'>
                {tests.length > 0 ? ( // Проверка наличия групп в списке
                    <ul>
                        {tests.map((test) => (<li key={test}>
                            <h6>{test}</h6>
                        </li>))}
                    </ul>) : (<p>Вы не составили ни одного варианта</p>)}
            </div>
        </div>
        <br/>
    </div>);
}