import {Navigate} from 'react-router-dom'
import CustomNavbar from "../custom-navbar/index.jsx";

const Layout = ({children, path}) => {
    if (!localStorage.getItem('token') && path !== '/login') {
        return <Navigate to="/login"/>
    }


    return <div>
        <CustomNavbar/>
        {children}
    </div>
}

export default Layout