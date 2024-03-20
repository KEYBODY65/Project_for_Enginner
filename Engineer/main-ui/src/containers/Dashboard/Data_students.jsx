import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";


export default function DataStudents() {
    const [names, setNames] = useState([]);
    const [logins, setLogins] = useState([]);
    const cookies = new Cookies();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        }
    };
    const formData = new FormData();
    let params = new URLSearchParams(document.location.search);
    let groupId = params.get('id');
    formData.append('group_id', groupId)
    useEffect(() => {
        axios.post('/teacher/students_logins/', formData, config)
            .then(res => {
                const parsedData = [];
                Object.entries(res.data.logins_passwords).forEach(([key, value]) => {
                    const name = key;
                    const loginAndPassword = value.split('Логин:').slice(1);
                    const login = loginAndPassword[0].split('Пароль:')[0].trim();
                    const password = loginAndPassword[0].split(' Пароль:')[1].trim();
                    parsedData.push([name, [login, password]]);
                });
                setNames(parsedData.map(([name]) => name));
                setLogins(parsedData.map(([, [login, password]]) => [login, password]));
            })
    }, []);
    return (
        <div className="container">
            <h3> Таблица данных учеников</h3>
            <br/>
            <table className="table">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">ФИО</th>
                    <th scope="col">Login</th>
                    <th scope="col">Passsword</th>
                </tr>
                </thead>
                <tbody>
                {names.map((name, id) => (
                        <tr key={id}>
                            <th scope="row">{name}</th>
                            <td>{logins[id]?.[0]}</td>
                            <td>{logins[id]?.[1]}</td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>

    )
}