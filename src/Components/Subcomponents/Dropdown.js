import React, {useState, useRef} from 'react';
import { 
  mdiMenuDownOutline
} from '@mdi/js';
import Icon from "@mdi/react";
import useOutsideAlerter from 'Hooks/useOutsideAlerter';

function Dropdown({size, itemTitles, selectedIndex, selectedItem}) {
  
  const mini = size === 'mini';
  const wide = size === 'wide';
  
  const [isActive, setIsActive] = useState(false);
  
  function clickedItem(index) {
    // setSelectedIndex(index);
    setIsActive(false);
    selectedItem(index);
  }
  
  const wrappedRef = useRef(null);
  useOutsideAlerter(wrappedRef, () => {setIsActive(false)});
  
  return (
    <ul ref={wrappedRef} className={`dropdown ${isActive ? "active" : ""} ${mini ? "mini" : ""} ${wide ? "wide" : ""}`}>
      <button className="toggler" onClick={() => {setIsActive(!isActive)}}>
        {itemTitles[selectedIndex]}
        <Icon path={mdiMenuDownOutline} className="dropdown-icon" color="#fff" size="22"/>
      </button>
      <DropdownMenu itemTitles={itemTitles} onClick={clickedItem}/>
    </ul>
  )
}

Dropdown.defaultProps = {
  mini : false,
  selectedIndex : 0
}

function DropdownMenu({itemTitles, onClick}) {
  
  const items = itemTitles.map((title, index) => {
    return <DropdownItem onClick={() => {onClick(index)}} key={index}>{title}</DropdownItem>
  })
  
  return <div className={`dropdown-options`}>
    {items}
  </div>
}

function DropdownItem({children, onClick}) {
  
  // Note the onMouseDown preventDefault(); For some reason, the onBlur event cancels
  // out the onClick handler from running. preventDefault() for onMouseDown prevents
  // onBlur from running until after onClick is run.
  return (
    <li className="dropdown-item" onMouseDown={(e) => {e.preventDefault();}} onClick={onClick}>
      {children}
    </li>
  )
}

export {
  Dropdown,
  DropdownMenu,
  DropdownItem
};
