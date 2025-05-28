import { Link, useLocation } from 'react-router-dom';


interface SidebarLinkProps {
    route: string;
    title: string;
}

const SidebarLink = ({route, title}: SidebarLinkProps) => {

    const location = useLocation();
    console.log("current path "+location.pathname); 
    const isActive = location.pathname === route;
    return (

        <Link to={route}>
            <li className={isActive? 'active': ''}>{title}</li>
        
        </Link>
    )
    
}

export default SidebarLink;