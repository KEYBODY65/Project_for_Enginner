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
            describe: document.getElementById('describe').value,
            comments: document.getElementById('floatingTextarea').value,
            weight: document.getElementById('input').value,
            files: document.getElementById('formFileMultiple').files,
        };
        setSubmittedTasks(newTask); // Добавление задания в список
        console.log(submittedTasks);
    }

    function sendTasksToServer() {
        const url = '/teacher/new_task_data/'; // Замените на ваш URL сервера
        const formData = new FormData();

        submittedTasks.forEach((task, index) => {
            Object.keys(task).forEach(key => {
                if (key === 'files' && task[key] instanceof FileList) {
                    // Если ключ - 'files' и значение является FileList (т.е. массивом файлов)
                    Array.from(task[key]).forEach(file => {
                        formData.append(`file_${index}_${file.name}`, file);
                    });
                } else {
                    formData.append(`${key}_${index}`,task[key]);
                }
            });
        });
        // Отправка POST-запроса на сервер с данными списка заданий
        const config = {
            headers: {
                "Authorization": csrfToken,
                'Content-Type': 'multipart/form-data'
            }
        }
        fetch(url, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Данные успешно отправлены на сервер
            })
            .catch(error => {
                console.log(error)
            });
    }


    function renderTasks() {
        return (
            <div>
                <div className="form-floating">
                    <input className="form-control" placeholder="Leave a comment here" id="describe" type='text'/>
                    <label htmlFor="describe">Определите задание</label>
                    <br/>
                </div>
                <div className='form-floating'>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea"
                              style={{height: 100}}></textarea>
                    <label htmlFor="floatingTextarea">Comments</label>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="file" id="formFileMultiple" multiple/>
                </div>
                <div className='form-floating'>
                    <input className="form-control" placeholder="Leave a comment here" id="input" type='number'/>
                    <label htmlFor="input">Вес задания</label>
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
                                className='btn btn-primary mt-2'> Сохранить
                        </button>
                        <br/>
                    </form>
                    <button className='btn btn-primary mt-2' onClick={sendTasksToServer}>
                        Отправить задания на сервер
                    </button>
                </>
            ) : (
                <h5>
                    Нажмите <span style={{textDecorationLine: 'underline'}}>+</span>, что бы добавить задание
                </h5>
            )}
        </div>
    );

}