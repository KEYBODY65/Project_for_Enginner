// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../components/Navbar.jsx';
// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};


export default Layout;