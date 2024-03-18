import React from 'react'
import {Provider} from 'react-redux'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'

import Login from './containers/Login.jsx'
import Signup from './containers/Signup.jsx'
import Layout from './hocs/Layout.jsx'
import store from './store.jsx'

import CreateTask from './containers/CreateTask.jsx'
import CreateTest from './containers/CreateTest.jsx'
import Dashboard from './containers/Dashboard.jsx'
import Group from './containers/Dashboard/Group.jsx'
import Groups from './containers/Groups.jsx'
import Home from './containers/Home.jsx'
import Main from './containers/Main.jsx'
import Add_student from './containers/add_student.jsx'

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/teacher" element={<Home/>}/>
                        <Route path="/teacher/auth" element={<Login/>}/>
                        <Route path="/teacher/register" element={<Signup/>}/>
                        <Route path="/teacher/dashboard" element={<Dashboard/>}/>
                        <Route
                            path="/teacher/dashboard/add_student"
                            element={<Add_student/>}
                        />
                        <Route path="/teacher/dashboard/groups/group" element={<Group/>}/>
                        <Route
                            path="/teacher/dashboard/new_task"
                            element={<CreateTask/>}
                        />
                        <Route
                            path="/teacher/dashboard/add_test"
                            element={<CreateTest/>}
                        />
                        <Route path="/teacher/dashboard/groups" element={<Groups/>}/>
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    )
}

export default App
