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

    function getTasks(tasks) {
        tasks.map(id_task => {
                    let body = {
                        task_id: id_task,
                    }
                    axios.post('/teacher/current_task/', body, config)
                    .then(result => {
                        setTasks(prevTasks => [...prevTasks, result.data])
                    })
                })
    }

    useEffect(() => {
        const formData = {};
        formData.id = variantId;
        axios.post('/teacher/current_task/', formData, config)
            .then(res => {
                console.log(res.data)
                // console.log(res.data.tasks.split(' '));
                // if (res.data.tasks.split(' ').length > 1){
                //     getTasks(res.data.tasks);
                // } else{
                //     setTasks([res.data.tasks]);
                // }
            })
            .catch(err => {
                console.error(err);
            })

    }, []);
    console.log(tasks)
    return (
        <div className={'container'}>
            {tasks.length > 0 ?
                <form>
                    <p>Вариант #{variantId}</p>
                    {tasks.map((task, id) =>
                        <div className='form-group' key={id}>
                            <p>{task}</p>
                            <input
                                className='form-control'
                                type={'text'}
                                placeholder={'Впишите ответ'}
                            />
                        </div>
                    )}
                    <button type={'submit'}>Отправить</button>
                </form> :
            <p> Вариант пустой или его не создали </p>
            }
        </div>

    )
}