import axios from 'axios';
import {useState, useEffect} from 'react';


export default function Group() {
    const [token, setToken] = useState('');
    const config = {
        headers: {
            'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRFToken': token
        }
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudents, setSelectedStudents] = useState('');
    const [students, setStudents] = useState([])
    const [studentObject, setStudentObject] = useState({});
    const [succes, setSuccess] = useState(false);
    const [Groups, setGroups] = useState(false);
    const [testIds, setTestIds] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [tests, setTests] = useState([]);
    let params = new URLSearchParams(document.location.search);
    let groupId = params.get('id');
    const formData = new FormData();
    if (groupId) {
        formData.append('group_id', groupId.toString());
    }

    const [gettingStudents, setGettingStudents] = useState([]);

    useEffect(() => {
        axios.get('/teacher/add_student_data/')
            .then(res => {
                setGettingStudents(Object.values(res.data.student))
            })
            .catch(err => {
                console.error(err);
            })
        axios.get('/teacher/add_student_data/')
            .then(res => {
                let data = res.data.student;
                setStudentObject({});
                setStudents([]);
                setStudentObject(data);
                setStudents(Object.values(data));
                // setStudents(res.data.student);
            })
            .catch(err => {
                console.error(err);
            })
        axios.get('/teacher/get_csrf')
            .then(res => {
                const Token = res.data.csrfToken;
                setToken(Token);
            })
            .catch(err => {
                console.error(err);
            });

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

    function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        let params = new URLSearchParams(document.location.search);
        let groupId = params.get('id');
        if (groupId) {
            formData.append('group_id', groupId.toString());
        }
        formData.append('student_id', selectedStudents);
        axios.post('/teacher/dashboard/add_students_to_group_data/', formData, config)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            })
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

                <h5>Succes</h5>

            </div>

        )
    }

    function handleNewTaskClick() {
        setGroups(true);
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredStudents = students.filter((student) =>
        student.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleCheckboxChange = (student) => {
        {
            document.querySelectorAll('input[type="checkbox"]:checked').length !== 0 ?
                setSelectedStudents(student) : setSelectedStudents('')
        }
    };

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
                                placeholder="Search for a student..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                required
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                            {searchQuery.length > 0 && (
                                <ul>
                                    {filteredStudents.map((student, index) => (
                                        <li key={index}>
                                            <input type="checkbox" className="btn-check" id={`stud_${Object.keys(studentObject).find(k => studentObject[k] === student)}`}
                                                   onChange={() => handleCheckboxChange(() => Object.keys(studentObject).find(k => studentObject[k] === student))}/>
                                            <label className="btn btn-outline-primary"
                                                   htmlFor={`stud_${Object.keys(studentObject).find(k => studentObject[k] === student)}`}>{student}</label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    {document.querySelectorAll('input[type="checkbox"]:checked').length !== 0 &&
                        <input type="submit" className="btn btn-primary mt-2"/>
                    }
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
                    {gettingStudents.length > 0 ? ( // Проверка наличия групп в списке
                        <ul>
                            {gettingStudents.map((student, index) => (
                                <li key={index}>
                                    <h4>{student}</h4>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Вы не добавили никого</p>
                    )}
                </div>
            </div>
            <br/>
            <hr className="my-4" style={{
                width: '43%'
            }}/>
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