import React, {useEffect} from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';

// checkAuthenticated, load_user,
const Layout = ({checkAuthenticated, load_user, children}) => {
    // useEffect(() => {
    //     checkAuthenticated();
    //     load_user();
    // }, []);

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};


export default Layout;