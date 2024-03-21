import {useState, useEffect} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {Link} from "react-router-dom";

export default function DashboardStudent() {
    // const [tests, setTests] = useState([]);
    const [id, setId] = useState();
    const [groups, setGroups] = useState([])
    const cookies = new Cookies();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        }
    };
    useEffect(() => {
        let params = new URLSearchParams(document.location.search);
        const studentId = Number(params.get("id"));
        const formData = new FormData();
        formData.append("id", studentId);
        axios.post('/teacher/students_groups/', formData, config)
            .then(res => {
                console.log(res.data);
                setGroups(res.data.groups);
            })
    }, []);
    // console.log(groups);
    return (
        <div className={'container'}>
            <div className='jumbotron mt-5'>
                <h1 className='display-4'>Добро пожаловать в личный кабинет ученика</h1>
            </div>
            <hr className='my-4'/>
            <div className='c d-flex'>
                {groups.map((group, id) => (
                    <Link to='' key={id}>
                        <div className='card border-primary mb-3' style={{maxWidth: '18rem'}}>
                            <div className='card-header' style={{height: 40}}></div>
                            <div className='card-body'>
                                <h5 className='card-title'>Группы</h5>
                                <p className='card-text'>Список ваших классов, добавление новых групп</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}