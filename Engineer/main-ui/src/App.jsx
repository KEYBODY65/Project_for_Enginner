import {Provider} from 'react-redux'
import {Route, BrowserRouter as Router, Routes, RouterProvider, createBrowserRouter} from 'react-router-dom'

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

import LoginStudent from "./containers/stud/Login.jsx";
import DashboardStudent from "./containers/stud/Dashboard.jsx";
import DataStudents from "./containers/Dashboard/Data_students.jsx";
import GroupStudent from "./containers/stud/Group.jsx";
import VariantOfStudent from "./containers/stud/Variant.jsx";
import LayoutStud from "./hocs/LayoutStud.jsx";

const router = createBrowserRouter([
    {
        path: "/teacher/dashboard",
        element: <Layout/>,
        children: [
            {
                path: '/teacher/dashboard',
                element: <Dashboard />,
            },
            {
                path: "/teacher/dashboard/add_student",
                element: <Add_student/>,
            },
            {
                path: "/teacher/dashboard/groups/group",
                element: <Group />,
            },
            {
                path: "/teacher/dashboard/new_task",
                element: <CreateTask />,
            },
            {
                path: "/teacher/dashboard/add_test",
                element: <CreateTest />,
            },
            {
                path: '/teacher/dashboard/students_logins',
                element: <DataStudents />,
            },
            {
                path: "/teacher/dashboard/groups",
                element: <Groups />,
            },
        ],
    },
    {
        path: "/student/dashboard",
        element: <LayoutStud/>,
        children: [
            {
                path: "/student/dashboard",
                element: <DashboardStudent />,
            },
            {
                path: '/student/dashboard/group',
                element: <GroupStudent />,
            },
            {
                path: '/student/dashboard/group/test',
                element: <VariantOfStudent />,
            },
        ],
    },
    {
        path: "/",
        element: <Main/>,
    },
    {
        path: "/teacher/auth",
        element:<Login/>,
    },
    {
        path: "/teacher/register",
        element: <Signup />,
    },
    {
        path: "/student/student_login",
        element: <LoginStudent />,
    }
])
const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    )
}

export default App
