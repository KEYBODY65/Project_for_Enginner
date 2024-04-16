import Cookies from "universal-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import './stud.css';

export default function VariantOfStudent() {
    const [isModal, setIsModal] = useState(false);
    const cookies = new Cookies();
    const [error, setError] = useState('');
    const [numTasks, setNumTasks] = useState();
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [formData, setFormData] = useState([]);
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
                }).finally(() => setIsLoading(false))
        })
    }

    useEffect(() => {
        const formData = {};
        formData.test_id = variantId;
        setIsLoading(true);
        axios.post('/teacher/test_tasks/', formData, config)
            .then(res => {
                setNumTasks(res.data.tasks.length)
                getTasks(res.data.tasks);
            })
            .catch(err => {
                console.error(err);
            })

    }, []);

    function ComponentModel() {
        setIsModal(true);
        document.addEventListener("click", event => {
            if (event.target.closest("#modal-content-src") || event.target.closest("#modalSrc")) {
                setIsModal(false);
            }
        });
    }

    function ShowModal() {
        return (
            <section id={'modalSrc'}>
                <img id={'modal-content-src'} src={`data:image/jpeg;base64,${url}`} alt={''}/>
            </section>
        )
    }

    const onChange = (id, value) => setFormData(prevFormData => ({...prevFormData, [id]: value.trim()}));

    function SendAnswers() {
        const data = {};
        data.test_id = variantId;
        data.true_answers = Object.values(formData);
        console.log(data.true_answers.length, numTasks);
        if (data.true_answers.length === numTasks){
            axios.post('/student/upload_answers/', data, config)
            .then(() => setIsLoading(true))
            .finally(() => setIsLoading(false));
        } else {
            setError('Вы не заполнили все поля ответов')
        }
    }

    console.log(error);
    return (
        <div className={'container'}>
            {isLoading ?
                <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="visually-hidden">Loading...</span>
                </> : <section>
                    {tasks.length > 0 ?
                        <form>
                            <p>Вариант #{variantId}</p>
                            {tasks.map((task, id) =>
                                <div className="card mb-3" key={id}>
                                    <img src={`data:image/jpeg;base64,${task.file}`} className="card-img-top"
                                         onClick={() => {
                                             setUrl(task.file)
                                             ComponentModel()
                                         }}/>
                                    <div className="card-body">
                                        <h5 className="card-title">{task.task_name}</h5>
                                        <pre className="card-text">{task.task_description}</pre>
                                        <textarea
                                            id={`task_${task.task_id}`}
                                            className='form-control'
                                            placeholder={'Впишите ответ'}
                                            rows={1}
                                            required
                                            onBlur={e => onChange(e.target.id, e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {isModal && <ShowModal/>}
                            <button className={'btn btn-secondary'} type={'button'} onClick={SendAnswers}>
                                {isLoading ?
                                    <>
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"></span>
                                        <span className="visually-hidden">Loading...</span>
                                {error.length > 0 && error}
                                    </> : <p>Отправить</p>}
                            < /button>
                        </form> :
                        <p> Вариант пустой или его не создали </p>
                    }
                </section>}

        </div>

    )
}