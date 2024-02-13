import './static/Dashboard.css';
import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function CreateTask() {
    const [submittedTasks, setSubmittedTasks] = useState([]);
    const [tasks, setTasks] = useState(false);
    const [csrfToken, setCsrfToken] = useState();

    function handleNewTaskClick() {
        setTasks(true);
    }

    useEffect(() => {
        axios
            .get('/teacher/get_csrf')
            .then(res => {
                const csrfToken = res.data.csrfToken;
                setCsrfToken(csrfToken);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        const newTask = {
            task_name: document.getElementById('describe').value,
            task_description: document.getElementById('floatingTextarea').value,
            true_answer: document.getElementById('true_answer').value,
            weight: document.getElementById('input').value,
            file: document.getElementById('formFileMultiple').files[0],
            subject: document.getElementById('floatingSelect').value
        };
        setSubmittedTasks([newTask]); // Добавление задания в список
        console.log(submittedTasks);
        const formData = new FormData();

        // Добавляем остальные данные в formData
        formData.append('task_name', newTask.task_name);
        formData.append('task_description', newTask.task_description);
        formData.append('true_answer', newTask.true_answer);
        formData.append('weight', newTask.weight);
        formData.append('file', newTask.file);
        formData.append('subject', newTask.subject);

        // Отправляем formData на сервер
        axios.post('/teacher/new_task_data/', formData, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function renderTasks() {
        return (
            <div>
                <div className="form-floating">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                        <option value='Алгебра' selected>Алгебра</option>
                        <option value="Геометрия">Геометрия</option>
                        <option value="Информатика">Информатика</option>
                        <option value="Физика">Физика</option>
                    </select>
                    <label htmlFor="floatingSelect">Выберите предмет</label>
                </div>
                <div className="form-floating">
                    <input className="form-control" placeholder="Leave a comment here" id="describe" type='text'/>
                    <label htmlFor="describe">Определите задание</label>
                    <br/>
                </div>
                <div className='form-floating'>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"
                              style={{height: 100}}></textarea>
                    <label htmlFor="floatingTextarea">Текст задания</label>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="file" id="formFileMultiple" multiple/>
                </div>
                <div className='form-floating'>
                    <input className="form-control" placeholder="Leave a comment here" id="input" type='number'/>
                    <label htmlFor="input">Вес задания</label>
                </div>
                <div className='form-floating'>
                    <input className="form-control" placeholder="Leave a comment here" id="true_answer" type='number'/>
                    <label htmlFor="input">Правильный ответ:</label>
                </div>
                <br/>
            </div>
        );
    }

    return (
        <div className='container'>
            <h2 style={{textAlign: 'center', marginTop: 20}}> Добавление заданий </h2>
            <hr className="my-4"/>
            <div className='new_test mb-3'>
                <div className='d-flex'>
                    <button className='btn btn-primary mt-2' onClick={handleNewTaskClick} type='button'>
                        +
                    </button>
                    <h5> Добавить </h5>
                </div>
            </div>
            <div className='new_test'>
            </div>
            {tasks ? (
                <>
                    <form>
                        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken}/>
                        {renderTasks()}
                        <button type='button' onClick={handleSubmit}
                                className='btn btn-primary mt-2'> Отправить данные на сервер
                        </button>
                        <br/>
                    </form>
                </>
            ) : (
                <h5>
                    Нажмите <span style={{textDecorationLine: 'underline'}}>+</span>, что бы добавить задание
                </h5>
            )}
        </div>
    );

}