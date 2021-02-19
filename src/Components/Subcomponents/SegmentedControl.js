import React from 'react';


function SegmentedControl({tabTitles, selectedIndex, didSelectIndex}) {
  
  const tabs = tabTitles.map((title, index) => {
    const active = index === selectedIndex;
    return <SegmentedControlTab title={title} key={index} id={index} active={active}
        onClick={() => {didSelectIndex(index)}}/>
  })
  
  return (
    <div className="segmented-control-wrapper">
      <div className="segmented-control">
        {tabs}
      </div>
    </div>
  );
}

function SegmentedControlTab({title, active, id, onClick}) {
  
  return <div className={`segmented-tab ${active ? "active" : ""}`} onClick={onClick}>{title}</div>
}

SegmentedControlTab.defaultProps = {
  title: "",
  active: false,
  selectedIndex : 0
}

export default SegmentedControl
