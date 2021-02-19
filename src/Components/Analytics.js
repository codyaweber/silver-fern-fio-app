import React, {useState, useEffect, useRef} from 'react';
import Network from 'networking/Network';
import DataTable from 'Components/Subcomponents/DataTable';
import SegmentedControl from 'Components/Subcomponents/SegmentedControl';
import TextInput from 'Components/Subcomponents/TextInput';
import {Dropdown} from 'Components/Subcomponents/Dropdown';
import Loader from 'Components/Subcomponents/Loader'
import Donut from 'Components/Subcomponents/Stats/Donut';


const network = new Network();

function Analytics() {
  
  const [selectedSegment, setSelectedSegment] = useState(0);
  const segmentTitles = [
    "Orders",
    "Stats"
  ]
  
  const [orderLoading, setOrderLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(true);
  
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);
  const [ordersFilterText, setOrdersFilterText] = useState("");
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  
  useEffect(() => {
    (async () => {
      const orderIds = await network.fetchOrderIds();
      const orderPromises = orderIds.map(network.fetchOrderById.bind(network));
      const orders = await Promise.all(orderPromises);
      
      setOrders(orders);
      setOrderLoading(false);
    })()
  }, [])
  
  const orderTableHeaderTitles = [
    "ID",
    "Customer",
    "Date",
    "Total Cost"
  ]
  
  const orderTableData = generateOrderTableRowData(orders);
  const orderTableProps = {
    headerTitles : orderTableHeaderTitles,
    isFetching : orderLoading,
    data : orderTableData,
    rowWidths : ['10%', '40%', '30%', '20%'],
    didSelectRow,
    selectedRowIndex : selectedOrderIndex
  }
  
  const orderDetailTableHeaderTitles = [
    'Item ID',
    'Item',
    'Cost',
    'Quantity',
    'Ext Cost'
  ]
  
  const orderDetailTableData = generateOrderDetailRowData(orderDetail);
  
  const orderDetailTableProps = {
    headerTitles : orderDetailTableHeaderTitles,
    isFetching : detailLoading,
    data : orderDetailTableData,
    rowWidths : ['10%', '30%', '30%', '15%', '15%'],
    didSelectRow : () => {}
  }
  
  function generateOrderTableRowData(orders) {
    if(orders.length === 0) {
      return []
    }
  
    const orderData = orders.map(order => {
      const ymd = order.displayOrderDate.split(',')[0];
      return [
        order.id,
        `${order.customer.firstName} ${order.customer.lastName}`,
        ymd,
        `$${order.cost}`
      ]
    })
    return orderData;
  }
  
  function generateOrderDetailRowData(orderDetail) {
    if(!orderDetail) {
      return [];
    }
    
    return orderDetail.items.map((item, index) => {
      const quantity = orderDetail.quantities[index];
      return [
        item.id,
        item.title,
        item.cost,
        quantity,
        (item.cost * quantity).toFixed(2)
      ]
    })
  }
  
  function fetchOrderDetail(orderId) {
    return network.fetchOrderDetailsById(orderId);
  }
  
  async function didSelectRow(i) {
    setDetailLoading(true);
    setSelectedOrderIndex(i);
    const order = orders[i];
    const orderDetail = await fetchOrderDetail(order.id)
    setOrderDetail(orderDetail);
    setDetailLoading(false);
  }
  
  return (
    <>
      <div className="row">
        <div className="col-1">
          <SegmentedControl tabTitles={segmentTitles}
          selectedIndex={selectedSegment}
          didSelectIndex={setSelectedSegment}>
          </SegmentedControl>
        </div>
      </div>
      { selectedSegment === 0 &&
        <div className="row">  
          <div className="col-5 orders-list dash-card">
            <h3>Orders</h3>
            <DataTable {...orderTableProps}></DataTable>
          </div>
          {orderDetail && <div className="col-5 orders-list dash-card">
            <div className="clearfix">
              <h3 className="pr-2 float-left">Details</h3>
              <h5 className="float-right">{orderDetail.displayOrderDate}</h5>
              <h5 className="pr-4 float-right">Total: ${orderDetail.totalCost.toFixed(2)}</h5>
              <h5 className="pr-4 float-right">ID: {orderDetail.id}</h5>
            </div>
            <DataTable {...orderDetailTableProps}></DataTable>
          </div>}
        </div>
      }
      { selectedSegment === 1 && 
        <div className="row">  
          <div className="col-7 dash-card">
            <Donut></Donut>
          </div>
        </div>
      }
    </>
  )
}

export default Analytics;
