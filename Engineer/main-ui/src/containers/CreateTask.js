import './static/Dashboard.css';
import React, {useState} from 'react';

export default function CreateTask(){
    const [submittedTasks, setSubmittedTasks] = useState([]);
    const [tasks, setTasks] = useState(false);

    function handleNewTaskClick() {
        setTasks(true);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newTask = {
        // Ваши данные о задании (например, комментарий, вес и т.д.)
        };
        setSubmittedTasks([...submittedTasks, newTask]); // Добавление задания в список
    }
    function sendTasksToServer() {
      const url = ''; // Замените на ваш URL сервера
      // Отправка POST-запроса на сервер с данными списка заданий
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submittedTasks),
      })
        .then(response => response.json())
        .then(data => {
          // Данные успешно отправлены на сервер
        })
        .catch(error => {
          console.log(error)
        });
    }


    function renderTasks(){
        return  (
            <div>
                <div className='form-floating'>
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" style={{height: 100}}></textarea>
                    <label htmlFor="floatingTextarea">Comments</label>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="file" id="formFileMultiple" multiple/>
                </div>
                <div className='form-floating'>
                    <input className="form-control" placeholder="Leave a comment here" id="input" type='number'/>
                    <label htmlFor="input">Вес задания</label>
                </div>
                <br/>
            </div>
        );
    };
    return(
        <div className='container'>
            <h2 style={{textAlign: 'center',  marginTop: 20}} > Добавление заданий </h2>
            <hr className="my-4" />
            <div className='new_test mb-3'>
                <div className='d-flex'>
                    <button className='btn btn-primary mt-2' onClick={handleNewTaskClick}  type='button'>
                    +
                    </button>
                    <h5> Добавить </h5>
                </div>
            </div>
            <div className='new_test'>
                </div>
            <form>

                {tasks ?(
                    <>
                        {renderTasks() }
                        <button type='submit' onClick={handleSubmit} className='btn btn-primary mt-2'> Отправить </button>
                        <br/>
                        <button className='btn btn-primary mt-2' onClick={sendTasksToServer}>
                          Отправить задания на сервер
                        </button>
                    </>
                    ):(
                    <h5>
                        Нажмите <span style={{textDecorationLine: 'underline'}}>+</span>, что бы добавить задание
                    </h5>
                )}
            </form>
        </div>
    );

}