import React, {useState} from 'react';
import { 
  mdiTrayPlus,
  mdiTrayMinus
} from '@mdi/js';
import Icon from "@mdi/react";


function SelectableItem({title, subtitle, didAddItem, didRemoveItem}) {
  
  const [hoverClass, setHoverClass] = useState("");
  
  function minusEnter() {
    setHoverClass("item-remove")
  }
  
  function minusLeave() {
    setHoverClass("");
  }
  
  function plusEnter() {
    setHoverClass("item-add")
  }
  
  function plusLeave() {
    setHoverClass("");
  }
  
  const iconSize = '22';
  
  return <div className={`selectable-item ${hoverClass}`}>
    <Icon className="m-1" path={mdiTrayMinus} color='#F00' size={iconSize}
      onClick={didRemoveItem} onMouseEnter={minusEnter}
      onMouseLeave={minusLeave}></Icon>
    <div>
      <div className={`item-title crop-line-height`}>{title}</div>
      <div className='item-subtitle crop-line-height'>{subtitle}</div>
    </div>
    <Icon className="m-1" path={mdiTrayPlus} color='#0F0' size={iconSize}
      onClick={didAddItem} onMouseEnter={plusEnter}
      onMouseLeave={plusLeave}></Icon>
  </div>
}

export default SelectableItem;
