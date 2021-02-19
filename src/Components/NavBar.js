import React, {useState, useEffect} from 'react';
import BurgerButton from 'Components/Subcomponents/BurgerButton';

function NavBar() {
  
  const [showingNav, setShowingNav] = useState(false);
  
  useEffect(() => {
    const className = "nav-open";
    const root = document.getElementsByTagName('html')[0]; // '0' to assign the first (and only `HTML` tag)
    if(showingNav) {
      root.setAttribute('class', className);
    } else {
      root.removeAttribute('class', className);
    }
  }, [showingNav])
  
  return (
    <div className="navbar">
      <BurgerButton className="navbar-item d-lg-none" showingNav={showingNav} onClick={() => {setShowingNav(!showingNav)}}/>
    </div>
  );
}

export default NavBar;
