import {Navigate, Outlet} from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import {useSelector} from "react-redux";
export default function Layout() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return (
        <div>
            {!isAuthenticated && <Navigate to={'/'} />}
            <Navbar />
            <Outlet />
        </div>
    );
}
