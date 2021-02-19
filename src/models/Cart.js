
class Cart {
  
  constructor() {
    this.cartItems = {};
  }
  
  add(item) {
    const itemId = item.id;
    
    let count = 1;
    if(this.cartItems[itemId]) {
      count += this.cartItems[itemId].count;
    }
    
    this.cartItems[itemId] = {
      item,
      count
    };
  }
  
  remove(item) {
    const itemId = item.id;
    let count;
    
    if(this.cartItems[itemId]) {
      if(this.cartItems[itemId].count === 1) {
        delete this.cartItems[itemId];
        return;
      }
      
      count = this.cartItems[itemId].count - 1;
    } else {
      return;
    }
    
    this.cartItems[itemId] = {
      item,
      count
    };
  }
  
  count(item) {
    return this.cartItems[item.id].count;
  }
  
  totalCost() {
    const allCartItemIds = Object.keys(this.cartItems);
    
    const costs = allCartItemIds.map(itemId => {
      const cartItem = this.cartItems[itemId];
      return cartItem.item.cost * cartItem.count;
    })
    
    if(costs.length > 0) {
      return costs.reduce((a,b) => a + b).toFixed(2);
    } else {
      return 0;
    }
    // return this.cartItems.map(i => i.item.cost * i.count).reduce((a,b) => a+b);
  }
  
  items() {
    const allCartItemIds = Object.keys(this.cartItems);
    
    return allCartItemIds.map(itemId => {
      return this.cartItems[itemId];
    })
  }
  
  clear() {
    this.cartItems = {};
  }
  
  isEmpty() {
    return Object.keys(this.cartItems).length === 0;
  }
}

export default Cart;
