import React from 'react';
import Loader from 'Components/Subcomponents/Loader';


function DataTable({headerTitles, isFetching, data, rowWidths, didSelectRow, selectedRowIndex}) {
  
  let tableBody = [];
  let tableBodyOverlay = <></>
  
  if(!isFetching) {
    if(data.length === 0) {
      tableBodyOverlay = <div className="container-overlay">
        No Items
      </div>
    } else {
      // Map data each data item's fields to table cell
      tableBody = data.map((rowData, i) => {
        const cells = rowData.map((value, j) => {
          return (
            <td key={j} className="py-4">
              {value}
            </td>  
          );
        })
        
        let className;
        if(selectedRowIndex !== null) {
          className = i === selectedRowIndex ? 'selected' : ''
        }
        
        return (
          <tr key={i} className={className} onClick={() => {didSelectRow(i)}}>
          {cells}
          </tr>
        )
      })
    }
  } else {
    const cellsPerRow = headerTitles.length;
    tableBody = getEmptyRows(cellsPerRow);
  }
  
  const loaderRow = (
    <tr className="no-animate">
      <td style={{padding: 0}}>
        <div>
          <Loader></Loader>
        </div>
      </td>
    </tr>
  );
  
  return (
    <>
      <div className="scrollable table-wrapper">
        {tableBodyOverlay}
        <table className="table table-hover table-striped table-dark">
          <TableHeaderRow titles={headerTitles} widths={rowWidths}></TableHeaderRow>
          <tbody>
            {isFetching && loaderRow}
            {tableBody}
          </tbody>
        </table>
      </div>
    </>
  )
}

function TableHeaderRow({titles, widths}) {
  
  function clickedTableHeader(index) {
    // Set up if you want to add clickable headers...
    // Reordering with search queries is quite complex though
    // console.log("Clicked header ", index);
  }
  
  const headers = titles.map((title, i) => {
    const width = widths[i];
    return (
      <TableHeader key={i} title={title} width={width} onClick={() => {clickedTableHeader(i)} }></TableHeader>
    )
  })
  
  return (
    <thead>
      <tr className="no-animate">
        {headers}
      </tr>
    </thead>
  )
}

// Use this instead of <div> for <th> title wrapper if you want clickable headers
// <a style={{display: "block"}} className="p-3" onClick={onClick}>{title}</a>
function TableHeader({title, width, onClick}) {
  return (
    <th style={{width: width}} className="p-0 no-animate" scope="col">
      <div className="p-3">
        {title}
      </div>
    </th>
  )
}


// Return empty rows as placeholders for table
function getEmptyRows(cellsPerRow) {
  
  let rows = [];
  
  // 17 rows is enough to fit max-height of table; makes layout cleaner
  const emptyRows = 17;
  for(let i = 0; i<emptyRows; i++) {
    
    let cells = [];
    for(let j=0; j<cellsPerRow; j++) {
      const cell = <td key={j} className="py-4"></td>
      cells.push(cell);
    }
    
    const row = (
      <tr key={i} className="no-animate">
        {cells}
      </tr>
    )
    
    rows.push(row);
  }
  
  return rows;
}

export default DataTable;
