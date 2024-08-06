import {NavLink, useNavigate} from 'react-router-dom'

const CustomNavbar = () => {
    const getClassName = ({isActive}) => {
        return `${isActive && 'active-link'} nav-link`
    }

    const navigate = useNavigate()

    const links = [
        {
            path: '/',
            text: 'Home',
        },
        {
            path: '/users',
            text: 'Users',
        },
        {
            path: '/roles',
            text: 'Roles'
        },
        {
            path: '/categories',
            text: 'Categories'
        },
        {
            path: '/tags',
            text: 'Tags'
        },
    ]

    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Logo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                {links.map(link => (
                    <li className="nav-item" key={link.path}>
                        <NavLink className={getClassName} to={link.path}>{link.text}</NavLink>
                    </li>
                ))}
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login" onClick={() => {
                        localStorage.removeItem('token')
                    }
                    }>
                        Logout
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>
}

export default CustomNavbar