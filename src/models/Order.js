// Return an object containing Date and formatted string
function parseISO8601DateString(dateString) {
  if(dateString === null) {
    return {date: null, display: ""};
  }
  
  const dateOptions = {year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"};
  const date = new Date(Date.parse(dateString));
  const display = date.toLocaleDateString("en-US", dateOptions);
  
  return {date, display}
}

export default class Order {
  
  constructor(obj) {
    if(obj === undefined) {
      this.id = "";
      this.customerId = null;
      this.cost = (0).toFixed(2);
      this.orderDate = null;
      this.displayOrderDate = "";
      return;
    }
    
    this.id = obj.id;
    this.customerId = obj.customerId;
    this.cost = (Math.round(obj.cost * 100) / 100).toFixed(2);
    
    const parsedOrderDate = parseISO8601DateString(obj.orderDate);
    this.orderDate = parsedOrderDate.date;
    this.displayOrderDate = parsedOrderDate.display;
  }
}
