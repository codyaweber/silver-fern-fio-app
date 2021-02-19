import React, {useState, useEffect} from 'react';
import SegmentedControl from 'Components/Subcomponents/SegmentedControl';
import * as d3 from "d3";
import AnimatedPie from "Components/Subcomponents/Stats/AnimatedPie";
import Network from 'networking/Network';
const network = new Network();

function Donut() {
  
  const segmentTitles = [
    "Top 10 Items",
    "Top 15 Items",
    "Top 20 Items",
    "Top 5 Customers",
    "Top 10 Customers"
  ]
  
  const [selectedSegment, setSelectedSegment] = useState(0);
  const [topItems, setTopItems] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  
  const [chartData, setChartData] = useState([]);
  
  function createChartData(titles, totals, itemCount) {
    return totals.map((total, index) => {
      
      const title = titles[index];
      return {
        date: index,
        value: total,
        text : title
      }
    })
  }
  
  async function makeItemsChart() {
    let itemCount;
    switch(selectedSegment) {
      case 0:
        itemCount = 10;
        break;
      case 1:
        itemCount = 15;
        break;
      case 2:
        itemCount = 20;
        break;
      default:
        itemCount = 10;
        break;
    }
    const fetchedTopItems = await network.fetchTopItems(itemCount);
    setTopItems(fetchedTopItems);
    
    const itemTitles = fetchedTopItems.map(i => i.item.title);
    const itemTotals = fetchedTopItems.map(i => i.total);
    const data = createChartData(itemTitles, itemTotals, itemTotals.length);
    setChartData(data);
  }
  
  async function makeCustomersChart() {
    let customerCount;
    switch(selectedSegment) {
      case 3:
        customerCount = 5;
        break;
      case 4:
        customerCount = 10;
        break;
      default:
        customerCount = 5;
        break;
    }
    
    const fetchedTopCustomers = await network.fetchTopCustomers(customerCount);
    setTopCustomers(fetchedTopCustomers);
    
    const customerNames = fetchedTopCustomers.map(i => `${i.customer.firstName} ${i.customer.lastName}`);
    const purchaseTotals = fetchedTopCustomers.map(i => i.total);
    const data = createChartData(customerNames, purchaseTotals, purchaseTotals.length);
    setChartData(data);
  }

  // const [data, setData] = useState(generateData(10));

  useEffect(() => {
    if(selectedSegment < 3) {
      makeItemsChart();
    } else {
      makeCustomersChart();  
    }
    
  }, [selectedSegment]);

  return (
    <div className="App">
      <div className="mb-3">
        <SegmentedControl tabTitles={segmentTitles} didSelectIndex={setSelectedSegment}
                  selectedIndex={selectedSegment}></SegmentedControl>
      </div>
      <div>
        <span className="label"></span>
        <AnimatedPie
          data={chartData}
          width={400}
          height={400}
          innerRadius={100}
          outerRadius={200}
        />
      </div>
    </div>
  );
}


export default Donut;
