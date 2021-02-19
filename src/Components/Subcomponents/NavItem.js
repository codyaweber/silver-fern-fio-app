import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';

function NavItem({id, active, title, icon, color, linkTo}) {
  
  const activeClass = active ? "active" : "";
  
  return (
    <Link to={linkTo}>
      <li className={`nav-item ${activeClass}`}>
        <span className="nav-icon">
          <Icon path={icon} color={color} size="22"/>
        </span>
        <span className="nav-title">{title}</span>
      </li>
    </Link>
  )
}

export default NavItem;
