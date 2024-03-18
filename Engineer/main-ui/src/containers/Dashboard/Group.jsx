import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function Group() {
    const [Groups, setGroups] = useState(false);
    const [Group, setGroup] = useState("");
    const [SendGroup, setSendGroup] = useState({
        Group: ''
    });
    const [submittedGroup, setSubmittedGroup] = useState([]); // Сохранение введенных данных в отдельной переменной
    const savedGroup = localStorage.getItem('submittedGroup');

    if (savedGroup) {
        const parsedGroup = JSON.parse(savedGroup);

    }

    function show_test() {
        return (
            <div class="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autocomplete="off"/>
                <label class="btn btn-outline-danger" for="vbtn-radio1">1 задание 2947</label>
                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autocomplete="off"/>
                <label class="btn btn-outline-danger" for="vbtn-radio2">1 задание 2048</label>
                <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio3" autocomplete="off"/>
                <label class="btn btn-outline-danger" for="vbtn-radio3">1 задание 3892</label>
            </div>
        );
    };

    function onChange(e) {
        setGroup(e.target.value);
        setSendGroup(prevState => ({
            ...prevState,
            Group: e.target.value
        }));
    }

    function onSubmit(e) {
        e.preventDefault();
        setSubmittedGroup([...submittedGroup, Group]);

        console.log(SendGroup);
        localStorage.setItem('submittedGroup', JSON.stringify([...submittedGroup, Group]));

        e.preventDefault();

        setGroup(""); // Очищаем поле после отправки

    }

    function handleNewTaskClick() {
        setGroups(true);
    }

    function renderGroups() {
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"
                                  id="inputGroup-sizing-default">Имя и фамилия ученика</span>
                            <input
                                type="text"
                                className="form-control"
                                value={Group}
                                onChange={onChange}
                                required
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                            <input type="checkbox" className="btn-check" id="btncheck1"/>
                            <label className="btn btn-outline-primary" htmlFor="btncheck1">Андреев Иван</label>

                            <input type="checkbox" className="btn-check" id="btncheck2"/>
                            <label className="btn btn-outline-primary" htmlFor="btncheck2">Попов Михаил</label>

                            <input type="checkbox" className="btn-check" id="btncheck3"/>
                            <label className="btn btn-outline-primary" htmlFor="btncheck3">Петров Василий </label>
                        </div>
                    </div>
                    <input type="submit" className="btn btn-primary mt-2"/>
                </form>
            </div>
        );
    }

    return (
        <div className="container d-">
            <h2 style={{textAlign: 'center', marginTop: 20}}>Группа: Информатика 11Т </h2>
            <hr className="my-4"/>
            <div className="new_test mb-3">
                <div className="d-flex">
                    <button className="btn btn-primary mt-2" onClick={handleNewTaskClick} type="button">
                        +
                    </button>
                    <h5>Добавить ученика</h5>
                </div>
                <div>
                    <h4>Добавленные ученики</h4>
                </div>
            </div>
            <div className="new_test">
                {Groups ? (
                    <>
                        {renderGroups()}
                    </>
                ) : (
                    <h5>
                        Нажмите <span style={{textDecorationLine: 'underline'}}>+</span>, чтобы добавить участников
                    </h5>
                )}
                <div className='d-block'>
                    {submittedGroup.length > 0 ? ( // Проверка наличия групп в списке
                        <ul>
                            {submittedGroup.map((group, index) => (
                                <li key={index}>
                                    <a href="/dashboard/{group}">{group}</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Вы не добавили никого</p>
                    )}
                </div>
            </div>
            <br/>
            <div>
                <button className="btn btn-primary mt-2" type='submit'>Прикрепить тест</button>
            </div>
            <br/>
            <p> Составленные тесты: </p>
            <div class="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                <input type="radio" className="" name="vbtn-radio" id="vbtn-radio1" autocomplete="off"/>
                <label class="btn btn-outline-danger" for="vbtn-radio1">17.12 0389</label>
                <input type="radio" className="" name="vbtn-radio" id="vbtn-radio2" autocomplete="off"/>
                <label class="btn btn-outline-danger" for="vbtn-radio2">18.12 4672</label>
            </div>
        </div>
    );
}