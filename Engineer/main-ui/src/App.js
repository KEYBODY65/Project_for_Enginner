import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './containers/Home.js';
import Login from './containers/Login.js';
import Signup from './containers/Signup.js';
import Dashboard from './containers/Dashboard.js';
import CreateTask from './containers/CreateTask.js';
import CreateTest from './containers/CreateTest.js';
import Groups from './containers/Groups.js';
import Main from './containers/Main.js';
import Group from './containers/Dashboard/Group.js';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout.js';

const App = () => {
    return(

    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route path='/' element={<Main />} />

                    <Route path='/teacher' element={<Home />} />
                    <Route path='/teacher/auth' element={<Login />} />
                    <Route path='/teacher/register' element={<Signup />} />
                    <Route path='/teacher/dashboard' element={<Dashboard /> } />
                    <Route path='/teacher/dashboard/group' element={< Group/> } />
                    <Route path='/teacher/dashboard/new_task' element={<CreateTask /> } />
                    <Route path='/teacher/dashboard/new_test' element={<CreateTest /> } />
                    <Route path='/teacher/dashboard/groups' element={<Groups /> } />
                </Routes>
            </Layout>
        </Router>
    </Provider>

    );
}




export default App;