import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import NavBar from 'Components/NavBar';
import Sidebar from 'Components/Sidebar';
import 'assets/scss/shop.scss';
import routes from "routes.js";

function App() {
  
  // const match = useRouteMatch();
  // const { url } = match;
  
  function getRoutes() {
    
    const routeComponents = routes.map((routeInfo, key) => {
      const Component = routeInfo.component;
      const routePath = `/${routeInfo.path}`;
      return (
        <Route path={routePath} key={key}>
          <Component/>
        </Route>
      );
    });
    
    return routeComponents;
  };
  
  
  return (
    <Router>
      <Switch>
        <Route path="/(shop|analytics)">
          <div className="container-wrapper">
            <Sidebar routes={routes}/>
            <div className="main">
              <NavBar/>
              <div className="container-fluid section-wrapper">
                <Switch>
                  {getRoutes(routes)}
                </Switch>
              </div>
            </div>
          </div>
        </Route>
        <Route path="">
          <Redirect to={"/shop"}></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
