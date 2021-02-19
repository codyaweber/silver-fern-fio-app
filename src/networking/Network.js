import request from 'networking/Request';
import Customer from 'models/Customer';
import Item from 'models/Item';
import Order from 'models/Order';
import OrderDetails from 'models/OrderDetails';

const domain = 'http://localhost:5000';
const apis = {
  shopAPI : `${domain}/shop`,
  analyticsAPI : `${domain}/analytics`
}

class Network {
  constructor() {
    this.shopAPI = apis.shopAPI;
    this.analyticsAPI = apis.analyticsAPI;
  }
  
  async fetchItemIds(limit = 50, offset = 0) {
    const url = `${this.shopAPI}/items/ids?limit=${limit}&offset=${offset}`
    return this.fetchIds(url);
  }
  
  async fetchItemById(id) {
    const url = `${this.shopAPI}/items/${id}`
    const Model = Item;  
    return this.fetchModelById(url, Model);
  }
  
  async fetchTopItems(count = 10) {
    const url = `${this.analyticsAPI}/items/top/${count}`
    
    const itemsJSONArray = await request.get(url);
    const itemPromises = await itemsJSONArray.array.map(itemJSON => {
      return this.fetchItemById(itemJSON.itemId);
    })
    const items = await Promise.all(itemPromises);
    itemsJSONArray.array.forEach((itemJSON, index) => {
      itemJSON.item = items[index];
    })
    
    return itemsJSONArray.array;
  }
  
  async fetchOrderIds() {
    const url = `${this.analyticsAPI}/orders/ids`
    return this.fetchIds(url);
  }
  
  async fetchOrderById(id) {
    const url = `${this.analyticsAPI}/orders/${id}`
    const Model = Order;
    
    const order = await this.fetchModelById(url, Model);
    order.customer = await this.fetchCustomerById(order.customerId);
    return order;
  }
  
  async fetchOrderDetailsById(id) {
    const url = `${this.analyticsAPI}/orders/${id}/details`
    const Model = OrderDetails;
    
    const orderDetails = await this.fetchModelById(url, Model);
    const customerId = orderDetails.customerId;
    orderDetails.customer = await this.fetchCustomerById(customerId);
    
    const itemIds = orderDetails.items;
    const itemPromises = itemIds.map(this.fetchItemById.bind(this));
    orderDetails.items = await Promise.all(itemPromises);
    
    return orderDetails;
  }
  
  async fetchCustomerIds(limit = 50, offset = 0) {
    const url = `${this.analyticsAPI}/customers/ids?limit=${limit}&offset=${offset}`
    return this.fetchIds(url);
  }
  
  async fetchCustomerById(id) {
    const url = `${this.analyticsAPI}/customers/${id}`
    const Model = Customer;
    
    return this.fetchModelById(url, Model);
  }
  
  async fetchTopCustomers(count = 10) {
    const url = `${this.analyticsAPI}/customers/top/${count}`
    
    const customersJSONArray = await request.get(url);
    const customerPromises = await customersJSONArray.array.map(customerJSON => {
      return this.fetchCustomerById(customerJSON.customerId);
    })
    const customers = await Promise.all(customerPromises);
    customersJSONArray.array.forEach((customerJSON, index) => {
      customerJSON.customer = customers[index];
    })
    
    return customersJSONArray.array;
  }
  
  async submitOrder(customerId, items, itemQuantities) {
    const itemIds = items.map(i => i.id);
    
    const body = {
      customerId,
      itemIds,
      itemQuantities
    }
    
    const url = `${this.shopAPI}/orders`
    try {
      const result = await request.post(url, body);
      return result.orderId;
    } catch(e) {
      console.log("Error submitting order: ", e);
      return null;
    }
  }
  
  
  
  
  
  
  
  
  async fetchModelById(url, Model) {
    try {
      const json = await request.get(url)
      return new Model(json);
    } catch(e) {
      console.log(`Error fetching model by id: ${e}`);
      return new Model();
    }
  }
  
  async fetchIds(url) {
    try {
      const idsJSON = await request.get(url);
      return idsJSON.array;
    } catch(e) {
      console.log("Error fetching item ids: ", e);
      return [];
    }
  }
  
  
}

export default Network;
