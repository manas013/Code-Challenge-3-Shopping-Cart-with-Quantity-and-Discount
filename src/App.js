import React, { useState } from 'react';
import './App.css'

const productList = [
  {
    id: 1,
    name: 'Product A',
    price: 50,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Product B',
    price: 30,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Product c',
    price: 70,
    quantity: 1,
  },
  {
    id: 4,
    name: 'Product D',
    price: 95,
    quantity: 1,
  },

];

const App = () => {
  const [cart, setCart] = useState(productList);
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const handleDiscountChange = e => {
    const newDiscount = parseFloat(e.target.value);
    if (!isNaN(newDiscount) && newDiscount >= 0 && newDiscount <= 100) {
      setDiscount(newDiscount);
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountedTotal = subtotal * (1 - discount / 100);
    return discountedTotal.toFixed(2); // Format to 2 decimal places
  };

  return (
    <div className='main_div'>
      <h1>Shopping Cart</h1>
      <div className='main_table' style={{overflowX:'auto'}}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Product Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr className='table_body' key={product.id}>
              <td>{product.name}</td>
              <td>INR {product.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  min="1"
                  onChange={e => handleQuantityChange(product.id, parseInt(e.target.value))}
                />
              </td>
              <td>INR {(product.price * product.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div style={{display:'flex',flexWrap:'wrap'}}>
      <div className='input-box'>
        <label style={{fontSize:"14px", fontWeight:'bold', marginRight:'5px', marginTop:'20px' }}>Discount (%):</label>
        <input type="number" placeholder='Discount (%)' value={discount} min="0" max="100" onChange={handleDiscountChange} />
      </div>
      <div className='total-allProductPrice'><p style={{fontSize:"14px", fontWeight:'bold', marginRight:'10px'}}>Total Price: </p> INR {calculateTotal()}</div>
      </div>
    </div>
  );
};

export default App;
