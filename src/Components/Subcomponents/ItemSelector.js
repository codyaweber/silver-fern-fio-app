import React from 'react';
import SelectableItem from 'Components/Subcomponents/SelectableItem';

function ItemSelector({items, didAddItem, didRemoveItem}) {
  
  function generateItemComponent(item, index) {
    return (
      <SelectableItem key={index}
              didAddItem={() => {didAddItem(index)}}
              didRemoveItem={() => {didRemoveItem(index)}}
              title={item.title}
              subtitle={item.cost}>
      </SelectableItem>
    )
  }
  
  const itemComponents = items.map(generateItemComponent);
  
  return (
    <div className={'row'}>
      {itemComponents}
    </div>
  )
}

export default ItemSelector;
