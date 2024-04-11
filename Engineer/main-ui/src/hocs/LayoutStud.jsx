import {Navigate, Outlet} from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import {useSelector} from "react-redux";
export default function LayoutStud() {
    const isStudentAuthenticated = useSelector(state => state.auth.isStudentAuthenticated);
    return (
        <div>
            {!isStudentAuthenticated && <Navigate to={'/'} />}
            <Navbar />
            <Outlet />
        </div>
    );
}
