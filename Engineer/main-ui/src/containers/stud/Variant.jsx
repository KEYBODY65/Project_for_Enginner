import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import axios from "axios";

export default function VariantOfStudent() {
    const cookies = new Cookies();
    const [tasks, setTasks] = useState([]);
    let params = new URLSearchParams(document.location.search);
    const variantId = Number(params.get("idTest"));
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken')
        }
    };
    useEffect(() => {
        const formData = new FormData();
        formData.append("test_id", variantId);
        axios.post('/teacher/test_tasks/', formData, config)
            .then(res => {
                console.log(res.data);
                res.data.tasks.map(id_task => {
                    let body = {
                        task_id: id_task,
                    }
                    axios.post('/teacher/current_task/', body, config)
                    .then(result => {
                        setTasks(prevTasks => [...prevTasks, result.data])
                    })
                })
            })
            .catch(err => {
                console.error(err);
            })

    }, []);
    return (
        <div className={'container'}>
            {tasks.length > 0 ?
                <form>
                    <p>Вариант #{variantId}</p>
                    {tasks.map(task => {
                        <div className='form-group'>
                            <p>{task[0]}</p>
                            <input
                                className='form-control'
                                type={'text'}
                                placeholder={'Впишите ответ'}
                            />
                        </div>
                    })}
                    <button type={'submit'}>Отправить</button>
                </form> :
            <p> Вариант пустой или его не создали </p>
            }
        </div>

    )
}