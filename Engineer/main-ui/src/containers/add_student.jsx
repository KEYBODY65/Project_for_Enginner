import {useEffect, useState} from "react";
import axios from "axios";
import './static/add_students.css';
import Cookies from "universal-cookie";


export default function Add_student() {
    const cookies = new Cookies();
    const [success, setsuccess] = useState(false);
    const [list, setList] = useState(false);
    const [names, setNames] = useState([]);
    const [ids, setIds] = useState([]);
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        }
    };

    useEffect(() => {
        axios.get('/teacher/add_student_data/')
            .then(res => {
                setNames(Object.values(res.data.student));
                setIds(Object.keys(res.data.student));
            })
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
    function DeleteStudent(ids_index, index){
        setIds(ids.filter((id) => id !== ids_index));
        setNames(names.filter((name) => name !== index));
        console.log(names);
        const body = {};
        body.id = ids_index;
        axios.post('', body, config);
    }

    function ListOfUsers() {
        return (
            <>
                {names.length > 0 ?
                    <section className="container">
                        <h3> Таблица учеников</h3>
                        <br/>
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ФИО</th>
                                <th scope="row">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {names.map((name, id) => (
                                    <tr key={id}>
                                        <th scope="row">{ids[id]}</th>
                                        <th scope="row">{name}</th>
                                        <th scope="row">
                                            <button type="button" className="btn btn-danger" onClick={() => DeleteStudent(ids[id], name)}>Удалить</button>
                                        </th>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    </section> : <p> Вы не добавили ни одного ученика</p>
            }
            </>
        )
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
            <button type={'button'} onClick={() => setList(!list)} className="btn btn-primary mt-2">Список учеников
            </button>
            {list && <ListOfUsers />}
        </section>
    )
}