import { useState } from "react";

const ShoppingCart = () => {
  const [products] = useState([
    { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
    { id: 2, name: "Smartphone", price: 25000, category: "Electronics" },
    { id: 3, name: "Headphones", price: 3000, category: "Electronics" },
    { id: 4, name: "Book", price: 500, category: "Education" },
    { id: 5, name: "T-Shirt", price: 800, category: "Fashion" },
    { id: 6, name: "Water Bottle", price: 300, category: "Sports" }
  ]);

  const [cartItems, setCartItems] = useState([]);

  // Derived state - Better than separate total state
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const itemCount = cartItems.length;

  // Enhanced add to cart with quantity tracking
  const addToCart = (productId) => {
    const productToAdd = products.find(product => product.id === productId);
    
    if (productToAdd) {
      setCartItems(prevCartItems => {
        // Check if item already exists in cart
        const existingItem = prevCartItems.find(item => item.id === productId);
        
        if (existingItem) {
          // If exists, increase quantity
          return prevCartItems.map(item =>
            item.id === productId
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        } else {
          // If new, add with quantity 1
          return [...prevCartItems, { ...productToAdd, quantity: 1 }];
        }
      });
    }
  };

  // Enhanced remove from cart
  const removeFromCart = (productId) => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity if more than 1
        return prevCartItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // Remove completely if quantity is 1
        return prevCartItems.filter(item => item.id !== productId);
      }
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🛒 Shopping Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Products Section */}
        <div>
          <h2>Available Products</h2>
          {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
            <div key={category} style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                backgroundColor: '#f0f0f0', 
                padding: '10px', 
                borderRadius: '5px' 
              }}>
                {category}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                {categoryProducts.map(product => (
                  <div key={product.id} style={{ 
                    border: '1px solid #ddd', 
                    padding: '15px', 
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}>
                    <h4 style={{ margin: '0 0 10px 0' }}>{product.name}</h4>
                    <p style={{ margin: '5px 0', color: '#666' }}>₹{product.price.toLocaleString()}</p>
                    <button 
                      onClick={() => addToCart(product.id)}
                      style={{
                        padding: '8px 15px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Your Cart</h2>
            {cartItems.length > 0 && (
              <button 
                onClick={clearCart}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>Your cart is empty</p>
          ) : (
            <>
              {cartItems.map(item => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  borderBottom: '1px solid #ddd'
                }}>
                  <div>
                    <h4 style={{ margin: '0' }}>{item.name}</h4>
                    <p style={{ margin: '0', color: '#666' }}>
                      ₹{item.price.toLocaleString()} 
                      {item.quantity > 1 && ` × ${item.quantity}`}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#ffc107',
                      color: 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              {/* Cart Summary */}
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #ddd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Items:</strong>
                  <span>{itemCount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2em' }}>
                  <strong>Total:</strong>
                  <strong>₹{total.toLocaleString()}</strong>
                </div>
                <button 
                  style={{
                    padding: '12px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '15px',
                    fontSize: '1.1em'
                  }}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;