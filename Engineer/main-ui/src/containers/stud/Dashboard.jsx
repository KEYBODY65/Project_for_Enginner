import {useState, useEffect} from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {Link} from "react-router-dom";

export default function DashboardStudent() {
    const [teachers, setTeachers] = useState([]);
    const [idsGroup, setIdsGroup] = useState([]);
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
                setGroups(Object.values(res.data.groups));
                setIdsGroup(Object.keys(res.data.groups));
            })
    }, []);
    useEffect(() => {
        if (idsGroup) {
            for (let i = 0; i < idsGroup.length; i++) {
                let formData = new FormData();
                console.log(idsGroup[i]);

                formData.append('group_id', Number(idsGroup[i]));
                axios.post('/teacher/teacher_name_by_id/', formData, config)
                    .then(res => {
                        console.log(res.data)
                        // setTeachers()
                    })
            }
        }
    }, [idsGroup]);
    return (
        <div className={'container'}>
            <div className='jumbotron mt-5' style={{
                textAlign: 'center'
            }}>
                <h1 className='display-4'>Добро пожаловать в личный кабинет ученика</h1>
            </div>
            <div className={'jumbotron mt-5'}>
                <p className={'display-6'}>Группы, в которых вы состоите</p>
            </div>
            <hr className='my-4'/>
            <div className='c d-flex'>
                {groups.map((group, id) => (
                    <Link to={`/student/dashboard/group?id=${idsGroup[id]}`} key={id}>
                        <div className='card border-primary mb-3' style={{maxWidth: '18rem'}}>
                            <div className='card-header' style={{height: 40}}></div>
                            <div className='card-body'>
                                <h5 className='card-title'>{group}</h5>
                                <p className='card-text'> Учитель: </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}