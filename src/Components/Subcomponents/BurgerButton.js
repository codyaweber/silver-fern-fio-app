import React from 'react';

function BurgerButton({className, showingNav, onClick}) {
  const classNames = `burger ${className} ${showingNav ? "toggled" : ""}`;
  
  return (
  	<button className={classNames} type="button" onClick={onClick}>
      <span className="burger-bar bar1"></span>
      <span className="burger-bar bar2"></span>
      <span className="burger-bar bar3"></span>
    </button>
  )
}

export default BurgerButton;
