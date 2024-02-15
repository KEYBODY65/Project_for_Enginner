import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function Group() {
    const [Test, setTest] = useState(false);
    const [tests, setTests] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [token, setToken] = useState();
    const config = {
        headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRFToken': token
        }
    };

    useEffect(() => {
        axios.get('/teacher/add_test_data')
            .then(response => {
                setTasks(response.data);

            })
            .catch(error => {
                console.error(error);
            });
        // axios.get('/teacher/groups_data')
        //     .then(response => {
        //         setTests(response.data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        // axios.get('/teacher/get_csrf')
        //     .then(res => {
        //         const Token = res.data.csrfToken;
        //         setToken(Token);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('student_name', document.getElementById('student_name').value);

        axios.post('/teacher/add_test_data/', formData, config)
            .then(response => {
                // Обработайте ответ сервера здесь
                console.log(response.data);
            })
            .catch(error => {
                // Обработайте ошибку здесь
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
                                <ul>
                                    {tests.map((task) => (
                                        <li key={task.id}>
                                            <input className="form-check-input" type="checkbox"
                                                   value="" id={task.id}/>
                                            <label className="form-check-label" htmlFor={task.id}>
                                                <a>{task.name}</a>
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
                        {tests.map((group) => (<li key={test}>
                            <a href="/dashboard/{group}">{test.id}</a>
                        </li>))}
                    </ul>) : (<p>Вы не составили ни одного варианта</p>)}
            </div>
        </div>
        <br/>
    </div>);
}