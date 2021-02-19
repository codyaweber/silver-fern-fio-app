import React, { useState, useEffect, useRef } from 'react';
import Network from 'networking/Network';
import TextInput from 'Components/Subcomponents/TextInput';
import ItemSelector from 'Components/Subcomponents/ItemSelector';
import {Dropdown} from 'Components/Subcomponents/Dropdown';
import Loader from 'Components/Subcomponents/Loader'
import Cart from 'models/Cart';

const network = new Network();
const cart = new Cart();

function Shop() {
  
  const [loading, setLoading] = useState(true);
  
  const searchTextRef = useRef("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  
  const customersRef = useRef([]);
  const [dropdownSelection, setDropdownSelection] = useState(0);
  
  const [cartItems, setCartItems] = useState(cart.items());
  const [cartTotal, setCartTotal] = useState(cart.totalCost());
  
  const isSearching = searchTextRef.current !== "";
  let displayItems = isSearching ? filteredItems : items;
  
  const cartList = generateCartList();
  let customerNames = customersRef.current.map(c => `${c.firstName} ${c.lastName}`);
  if(customerNames.length === 0) {
    customerNames = ["---"]
  }
  
  useEffect(() => {
    (async () => {
      const customerIds = await network.fetchCustomerIds();
      const customerPromises = customerIds.map(network.fetchCustomerById.bind(network));
      const customers = await Promise.all(customerPromises);
      const alphabetizedCustomers = customers.sort(alphabetize);
      customersRef.current = alphabetizedCustomers;
      
      const itemIds = await network.fetchItemIds();
      const itemPromises = itemIds.map(network.fetchItemById.bind(network));  
      const items = await Promise.all(itemPromises);
      const alphabetizedItems = items.sort(alphabetize)
      
      setLoading(false);
      setItems(alphabetizedItems);
    })()
  }, [])
  
  function alphabetize(a, b) {
    const titleA = a.title;
    const titleB = b.title;
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    
    // Equal
    return 0;
  }
  
  function didAddItem(index) {
    const item = displayItems[index];
    cart.add(item)
    setCartItems(cart.items());
    setCartTotal(cart.totalCost());
  }
  
  function didRemoveItem(index) {
    const item = displayItems[index];
    cart.remove(item);
    setCartItems(cart.items());
    setCartTotal(cart.totalCost());
  }
  
  function onSearchText(text) {
    searchTextRef.current = text;
    const niceText = text.toLowerCase().replace(/\s/g, '');
    const newFilteredItems = items.filter(item => {
      return item.niceTitle.includes(niceText);
    })
    
    setFilteredItems(newFilteredItems);
  }
  
  function generateCartList() {
    <div>{cartItems.map(i => i.item.title)}-{cartItems.map(i => i.count)}</div>
    return cartItems.map((cartItem, index) => {
      return <div className="cart-list-item" key={index}>
        <span className="count">{`${cartItem.count}`}</span>
        <span className="title">{`${cartItem.item.title}`}</span>
      </div>
    })
  }
  
  async function submitOrder() {
    if(cart.isEmpty()) {
      return;
    }
    setLoading(true);
    
    const customer = customersRef.current[dropdownSelection];
    const orderItems = cart.items().map(i => i.item);
    const itemQuantities = orderItems.map(item => cart.count(item));
    const result = await network.submitOrder(customer.id, orderItems, itemQuantities);
    if(result) {
      window.alert("Successfully processed! Your order id is " + result + ".");
      clearOrder();
    } else {
      window.alert("There was an error processing your order...weird. Sorry!");
    }
    
    setLoading(false);
  }
  
  
  function clearOrder() {
    searchTextRef.current = "";
    
    cart.clear();
    setCartItems(cart.items());
    setCartTotal(cart.totalCost());
  }
  
  return (
    <>
      {loading && <Loader></Loader>}
      <div className="content">
        <div className="row">
          <div style={{zIndex: 3}} className="col-11 dash-card position-relative">
            <h3>Who are you?!</h3>
            <Dropdown itemTitles={customerNames} selectedIndex={dropdownSelection}
                    selectedItem={(i) => {setDropdownSelection(i)}}></Dropdown>
          </div>
          <div className="col-11 dash-card">
            <h3>Select items for your cart:</h3>
            <TextInput onTextChange={onSearchText} placeholder="Filter..."></TextInput>
            <ItemSelector items={displayItems}
                  didAddItem={didAddItem}
                  didRemoveItem={didRemoveItem}>
            </ItemSelector>
          </div>
          <div className="col-3 dash-card shop-cart">
            <div className="clearfix">
              <h3 className="float-left">Your Cart</h3>
              <button className="float-right btn-lg btn-light"
                    onClick={submitOrder}>Submit Order!</button>
            </div>
            <h3 className="clearfix">${`${cartTotal}`}</h3>
            {cartList}
          </div>
          <div className="col-3">
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop;
