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

export default class OrderDetails {
  
  constructor(obj) {
    if(obj === undefined) {
      this.id = "";
      this.itemIds = [];
      this.customerId = null;
      this.orderDate = null;
      this.displayOrderDate = "";
      this.items = [];
      this.quantities = [];
      return;
    }
    
    this.id = obj.id;
    this.itemIds = obj.items;
    this.customerId = obj.customerId;
    this.items = obj.items;
    this.quantities = obj.quantities;
    this.totalCost = obj.orderCost;
    
    const parsedOrderDate = parseISO8601DateString(obj.orderDate);
    this.orderDate = parsedOrderDate.date;
    this.displayOrderDate = parsedOrderDate.display;
    
  }
}
