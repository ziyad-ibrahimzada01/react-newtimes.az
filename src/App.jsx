import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/";
import Layout from "./components/layout/";
import Login from "./pages/login/";
import {ToastContainer} from 'react-toastify';
import Roles from "./pages/roles/";
import Categories from "./pages/categories/";
import Tags from "./pages/tags";
import Users from "./pages/users";

const App = () => {
    const routes = [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/users',
            element: <Users/>
        },
        {
            path: '/categories',
            element: <Categories/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/tags',
            element: <Tags/>
        },
        {
            path: '/roles',
            element: <Roles/>
        },
        
    ]
    
    return <BrowserRouter>
        <ToastContainer/>
        <Routes>
            {routes.map(({path, element}) => (
                <Route key={path} path={path}
                       element={path.includes('login') ? element : <Layout path={path}>{element}</Layout>}/>
            ))}
        </Routes>
    </BrowserRouter>
}

export default App