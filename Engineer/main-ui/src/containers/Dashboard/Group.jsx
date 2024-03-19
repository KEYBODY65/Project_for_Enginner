import axios from 'axios';
import {useState, useEffect} from 'react';


export default function Group() {
    const [token, setToken] = useState('');
    const config = {
        headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRFToken': token
        }
    };
    const [succes, setSuccess] = useState(false);
    const [Groups, setGroups] = useState(false);
    const [Group, setGroup] = useState("");
    const [testIds, setTestIds] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [tests, setTests] = useState([]);
    const [SendGroup, setSendGroup] = useState({
        Group: ''
    });

    let params = new URLSearchParams(document.location.search);
    let groupId = params.get('id');
    const formData = new FormData();
    if (groupId) {
        formData.append('group_id', groupId.toString());
    }

    const [submittedGroup, setSubmittedGroup] = useState([]);

    useEffect(() => {
        axios.get('/teacher/get_csrf')
            .then(res => {
                const Token = res.data.csrfToken;
                setToken(Token);
            })
            .catch(err => {
                console.error(err);
            });
        console.log(token);

        axios.get('/teacher/add_test_data')
            .then(response => {
                const data = response.data;
                setTests([])
                let test_ids = data.tests_id;
                let tests_names = data.tests;
                setTestIds([]);
                setTestIds(test_ids);
                let UpdTests = [];
                test_ids.forEach(id => {
                    UpdTests.push(`${tests_names[id - 1]}`);
                })
                setTests(UpdTests);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    axios.post('/teacher/dashboard/groups/group_name/', formData, config)
        .then(response => {
            const data = response.data
            setGroupName(data.group_name);
        })
        .catch(err => {
            console.error(err);
        })

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

    function PublishTest(e) {
        e.preventDefault();
        setSuccess(false);
        const formData = new FormData();
        let test = [];

        document.querySelectorAll('input[type="radio"]:checked').forEach(elem => {
            test.push(elem.id);
        })
        if (test.length === 0) {
            document.getElementById('hiddenText').style.display = 'block';
        } else {
            document.getElementById('hiddenText').style.display = 'none';
            console.log(test);
            formData.append('group_id', groupId);
            formData.append('test_id', test[0])
            axios.post('/teacher/dashboard/add_test_to_group_data/', formData, config)
                .then(response => {
                    console.log(response.data)
                    setSuccess(true);
                    document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
                        input.checked = false;
                    })
                })
                .catch(err => {
                    console.error(err);
                    setSuccess(false);
                })
        }
    }

    function Succes() {
        return (
            <div className="tn-box tn-box-color-1">

                <p>Succes</p>

            </div>

        )
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
            <h2 style={{textAlign: 'center', marginTop: 20}}>Группа: {groupName} </h2>
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
            <form onSubmit={PublishTest}>
                <div>
                    <button className="btn btn-primary mt-2" type='submit'>Прикрепить тест</button>
                </div>
                {succes && (<Succes/>)}
                <div id={'hiddenText'} style={{
                    color: 'red',
                    display: "none"
                }}>
                    Вы не выбрали тест
                </div>
                <br/>
                <p> Составленные тесты: </p>
                <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                    <div className='d-block'>
                        {tests.length > 0 ? ( // Проверка наличия групп в списке
                            <ul>
                                {tests.map((test) => (<h4 key={tests.indexOf(test)}>
                                    <input type="radio" className="" name="vbtn-radio"
                                           id={testIds[tests.indexOf(test)]}/>
                                    <label className="btn btn-outline-danger"
                                           htmlFor={testIds[tests.indexOf(test)]}>{test}</label>
                                </h4>))}
                            </ul>) : (<p>Вы не составили ни одного варианта</p>)}
                    </div>
                </div>
            </form>
        </div>
    );
}