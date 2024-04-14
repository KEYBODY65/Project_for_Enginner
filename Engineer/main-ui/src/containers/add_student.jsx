import {useEffect, useState} from "react";
import axios from "axios";
import './static/add_students.css';


export default function Add_student() {
    const [csrfToken, setCsrfToken] = useState();
    const [success, setsuccess] = useState(false);
    const [list, setList] = useState(false);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': csrfToken
        }
    };

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

    function onSubmit(e) {
        e.preventDefault();
        setsuccess(false);

        const formData = new FormData();
        formData.append('student_name', document.getElementById('student_name').value);
        formData.append('student_surname', document.getElementById('student_surname').value);
        formData.append('student_patronymic', document.getElementById('student_patronymic').value);

        axios.post('/teacher/add_student_data/', formData, config)
            .then(response => {
                // Обработайте ответ сервера здесь
                console.log(response.data);
                setsuccess(true);
                document.querySelectorAll('input').forEach(input => {
                    input.value = '';
                });
            })
            .catch(error => {
                // Обработайте ошибку здесь
                console.error(error);
                setsuccess(false);
            });

    }

    function Success() {
        return (
            <div className="tn-box tn-box-color-1">

                <p>success</p>

            </div>

        )
    }

    function ListOfUsers(){

    }

    return (
        <section className="container d-">
            <h3 style={{textAlign: 'center', marginTop: 20}}>Добавление ученика</h3>
            <hr className="my-4"/>
            <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Фамилия</span>
                    <input
                        type="text"
                        className="form-control"
                        id='student_surname'
                        required
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Имя</span>
                    <input
                        type="text"
                        className="form-control"
                        id='student_name'
                        required
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">Отчество</span>
                    <input
                        type="text"
                        className="form-control"
                        id='student_patronymic'
                        required
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </div>
                <input type="submit" className="btn btn-primary mt-2"/>
            </form>
            {success && (<Success/>)}
            <hr className="my-4"/>
            <button type={'button'} onClick={() => setList(!list)} className="btn btn-primary mt-2">Список учеников</button>
            {list && <Success/>}
        </section>
    )
}