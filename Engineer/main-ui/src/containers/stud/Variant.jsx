import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import './stud.css';

export default function VariantOfStudent() {
    const [isModal, setIsModal] = useState(false);
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
        setTasks([])
        tasks.map(id_task => {
            let body = {
                id: id_task,
            }
            axios.post('/teacher/current_task/', body, config)
                .then(result => {
                    setTasks(prevTasks => [...prevTasks, result.data.task])
                })
        })
    }

    useEffect(() => {
        const formData = {};
        formData.test_id = variantId;
        axios.post('/teacher/test_tasks/', formData, config)
            .then(res => {
                getTasks(res.data.tasks);
            })
            .catch(err => {
                console.error(err);
            })

    }, []);

    function ComponentModel(){
        setIsModal(true);
    }
    function ShowModal(props){
        console.log(isModal)
        // document.addEventListener("click", event => {
        //     if (!event.target.closest("#modal-content-src") && !event.target.closest("#modalSrc")) {
        //         setIsModal(false);
        //     }
        // });
        return(
            <section id={'modalSrc'}>
                <img id={'modal-content-src'} src={props.src} alt={''}/>
                <p>xyi</p>
            </section>
        )
    }

    return (
        <div className={'container'}>
            {tasks.length > 0 ?
                <form>
                    <p>Вариант #{variantId}</p>
                    {tasks.map((task, id) =>
                        <div className="card mb-3" key={id}>
                            <button type={"button"} onClick={ComponentModel}>
                                <img src={`data:image/jpeg;base64,${task.file}`} className="card-img-top"/>
                            </button>
                            <div className="card-body">
                                <h5 className="card-title">{task.task_name}</h5>
                                <p className="card-text">{task.task_description}</p>
                                <input
                                    id={`task_${task.task_id}`}
                                    className='form-control'
                                    type={'text'}
                                    placeholder={'Впишите ответ'}
                                />
                            </div>
                        </div>
                    )}
                    {isModal && <ShowModal />}
                    <button className={'btn btn-secondary'} type={'submit'}>
                        Отправить
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden">Loading...</span>
                    </button>
                </form> :
                <p> Вариант пустой или его не создали </p>
            }
        </div>

    )
}