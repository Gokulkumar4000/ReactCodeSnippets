import { createContext, useContext ,useReducer} from "react";

// ❌ BAD: Props Drilling Example
//const GrandParent = () => {
//  const user = "Gokul";
//  return <Parent user={user} />; // Pass user down
//};
//
//const Parent = ({ user }) => {
//  return <Child user={user} />; // Parent doesn't use user, just passes it
//};
//
//const Child = ({ user }) => {
//  return <GrandChild user={user} />; // Child doesn't use user either
//};
//
//const GrandChild = ({ user }) => {
//  return <p>Hello {user}!</p>; // Only GrandChild actually uses user
//};

// Problem: Parent and Child have to receive and pass 'user' prop even though they don't use it!

// 1. Create Context
const UserContext = createContext();

// 2. Provider Component (wrap around parts that need access)
const UserProvider = ({ children }) => {
  const user = { name: "Gokul", age: 21 };
  
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Components that need user data
const Parent = () => {
  return <Child />; // No props!
};

const Child = () => {
  return <GrandChild />; // No props!
};

const GrandChild = () => {
  // 4. Use context in any component
  const user = useContext(UserContext);
  return <p>Hello, {user.name}!</p>;
};


// Reducer function - defines how state changes
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

const Counter = () => {
  // useReducer returns [state, dispatch]
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      {/* Dispatch actions to update state */}
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
};

// useReducer is better than useState when you have complex state updatesconst ModuleFive = () => {

  import { useState, useEffect } from 'react';

  // Custom Hook: useLocalStorage
  const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
      // Get from localStorage on first render
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    });
  
    // Update localStorage when value changes
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
  };
  
  // Using the custom hook in components
  const Component1 = () => {
    const [name, setName] = useLocalStorage('name', 'Gokul');
    return <input value={name} onChange={e => setName(e.target.value)} />;
  };
  
  const Component2 = () => {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    return (
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme}
      </button>
    );
  };
  
  // Custom hooks let you reuse state logic across components


// Your code here - Create ThemeContext, reducer, and components
const ThemeContext=createContext();
const ThemeProvider=({children})=>{
  const initialTheme={theme:"dark"}

  const themeReducer=(state,action)=>{
    switch(action.type){
      case "TOGGLE_THEME":
        return {theme:state.theme==="light"?"dark":"light"}
      default:
        return state;
    }
  }
  const [state,dispatch]=useReducer(themeReducer,initialTheme)
  const contextValue={
    theme:state.theme,
    toggleTheme:()=>dispatch({type:"TOGGLE_THEME"})
  }
  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  )
}

const ThemeButton = () => {
  // Should toggle between light/dark theme
  const context=useContext(ThemeContext);
  return (
    <button onClick={context.toggleTheme}>
      Switch to {context.theme==="light"? "Dark":"light"}
    </button>
  );
};

const ThemeDisplay = () => {
  // Should display current theme
  const context=useContext(ThemeContext);
  return (
    <div>
      <p>Current theme: {context.theme}</p>
    </div>
  );
};

// You need to implement:
// - CartContext
// - cartReducer with actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
// - CartProvider
// - ProductList component
// - Cart component

const products = [
  { id: 1, name: "iPhone", price: 50000 },
  { id: 2, name: "MacBook", price: 90000 },
  { id: 3, name: "AirPods", price: 15000 }
];

const CartContext=createContext()

const cartReducer=(state ,action)=>{
  switch(action.type){
    case "ADD_ITEM":
      console.log("item Added",action.item.name)
    case "REMOVE_ITEM":
      console.log("Item Removed",action.item.name)
    case "UPDATE_QUANTITY":
      console.log("Quantity updated",action.item.name)
    case "CLEAR_CART":
      console.log("Cart cleared")
    default:
      return state
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], totalPrice: 0 });
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const ProductList = ({ products }) => {
  const { dispatch } = useContext(CartContext);
  
  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", item: product });
  };
  return(
    <>
      <h1>Products</h1>
      <div>
        {
          products.map(product=>(
            <div key={product.id}>
              <h2>{product.name}</h2>
              <h2>{product.price}</h2>
              <button onClick={()=>addToCart(product)}>Add To Cart</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

const Cart=()=>{
  const {cart,dispatch}=useContext(CartContext)
  
  return (
    <>
      <h1>Cart Products</h1>
      <div>
      </div>
    </>
  )
}
const ModuleFive=()=>{
  return (
    <>
      <CartProvider>
       <ProductList products={products} />
       <Cart />
      </CartProvider>
    </>
  );
};

export default ModuleFive;