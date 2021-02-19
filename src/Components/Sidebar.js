import React, { useState, useEffect } from "react";
import { useRouteMatch, useLocation } from 'react-router-dom';
import {withRouter} from 'react-router';
import NavItem from "Components/Subcomponents/NavItem";
import { 
  mdiFlare
} from '@mdi/js';
import Icon from "@mdi/react";

function Sidebar({routes}) {
  const match = useRouteMatch();
  // Which NavItem id is active
  const [activeId, setActiveId] = useState(0);
  
  const location = useLocation();
  
  useEffect(() => {
    // The url paths of each sidebar item which the current user has permission to access
    const paths = routes.map(r => {
      return `${r.url}`;
    });
    
    for(let i=0; i<paths.length; i++) {
      const path = paths[i];
      if(location.pathname.startsWith(`/${path}`)) {
        setActiveId(i);
      }
    }
  }, [location.pathname, routes])
  
  function getNavItemForRoute(route, key) {
    const active = activeId === key;
    
    return (
      <NavItem id={key} key={key} active={active} title={route.name} icon={route.icon} 
            color="white" linkTo={`/${route.url}`}/>
    );
  }
  
  const navItems = routes.map(getNavItemForRoute)
  
  return (
    <div className="sidebar">
      <div className="brand">
        <div className="icon">
          <Icon path={mdiFlare} color="#fff" size="28"/>
        </div>
        <div className="brand-title d-inline">
          <span> Shop Portal </span>
        </div>
      </div>
      <ul className="sidebar-nav">
        {navItems}
      </ul>
    </div>
  )
  // return (
  //   <Nav className="col-md-1 d-none d-md-block bg-light sidebar"
  //     activeKey="/home"
  //     onSelect={selectedKey => alert(`selected ${selectedKey}`)}
  //   >
  //     <div className="sidebar-sticky"></div>
  //     <Nav.Item>
  //       <Nav.Link href="/home">Active</Nav.Link>
  //     </Nav.Item>
  //     <Nav.Item>
  //       <Nav.Link eventKey="link-1">Link 1</Nav.Link>
  //     </Nav.Item>
  //     <Nav.Item>
  //       <Nav.Link eventKey="link-2">Link 2</Nav.Link>
  //     </Nav.Item>
  //     <Nav.Item>
  //       <Nav.Link eventKey="disabled" disabled>
  //         Disabled Link
  //       </Nav.Link>
  //     </Nav.Item>
  //   </Nav>
  // );
};


export default withRouter(Sidebar);
