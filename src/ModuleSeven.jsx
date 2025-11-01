import { memo, useMemo ,useCallback} from 'react';
import React ,{ useState ,useRef,useLayoutEffect} from 'react';
import { lazy, Suspense } from 'react';

// ❌ WITHOUT React.memo
const WithoutMemo = ( {user} ) => {
  console.log('User rendered WithoutMemo'); // Logs every render
  return <div>{user}</div>;
};

// ✅ WITH React.memo
const WithMemo = React.memo(( {user} ) => {
  console.log('User rendered WithMemo'); // Only when props change
  return <div>{user}</div>;
});

const ReactMemo=()=>{
  const [count,setCount]=useState(0);
  const [text,setText]=useState("");
    <div>
    <input type="text" onChange={(e)=>setText(e.target.value)}/>
      <button onClick={()=>setCount(count+1)}>Count: {count}</button>
      <WithoutMemo user={`${text}`}/>
      <WithMemo user={`${text}`}/>
    </div>
}

const UseMemoDemo = () => {
  const [number, setNumber] = useState(1);
  const [text, setText] = useState('');

  // ❌ WITHOUT useMemo - runs every render
  const expensiveCalcBad = () => {
    console.log('Calculating...');
    return number * 2;
  };

  // ✅ WITH useMemo - only when number changes
  const expensiveCalcGood = useMemo(() => {
    console.log('Calculating...');
    return number * 2;
  }, [number]);

  return (
    <div>
      <p>Number: {number}</p>
      <button onClick={() => setNumber(n => n + 1)}>Change Number</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Result: {expensiveCalcGood}</p>
    </div>
  );
};


// Memoized Button component
const Button = memo(({ onClick, children }) => {
  console.log('🔴 BUTTON RENDERED:', children);
  return <button onClick={onClick}>{children}</button>;
});

const UseCallbackDemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ❌ WITHOUT useCallback - new function every render
  const incrementBad = () => {
    console.log('Bad function executed');
    setCount(count + 1);
  };

  // ✅ WITH useCallback - same function
  const incrementGood = useCallback(() => {
    console.log('Good function executed');
    setCount(prev => prev + 1);
  }, []);

  console.log('🟢 PARENT RENDERED');

  return (
    <div>
      <p>Count: {count}</p>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here and check console"
      />
      <Button onClick={incrementBad}>Increment Bad</Button>
      <Button onClick={incrementGood}>Increment Good</Button>
    </div>
  );
};

const UseRefDemo = () => {
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const [text, setText] = useState('');

  const focusInput = () => inputRef.current.focus();
  renderCount.current++;

  return (
    <div>
      <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={focusInput}>Focus Input</button>
      <p>Renders: {renderCount.current}</p>
    </div>
  );
};

const UseEffectDemo = () => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  return <div ref={ref}>Width: {width}px</div>;
};


const HeavyComponent = lazy(() => import('./ModuleSix'));

const CodeSplitting_LazyLoadingDemo = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
};



// Product Data
const productsData = [
  { id: 1, name: 'iPhone 15', price: 799, category: 'electronics', rating: 4.5 },
  { id: 2, name: 'MacBook Pro', price: 1999, category: 'electronics', rating: 4.8 },
  { id: 3, name: 'T-Shirt', price: 25, category: 'clothing', rating: 4.2 },
  { id: 4, name: 'Jeans', price: 45, category: 'clothing', rating: 4.3 },
  { id: 5, name: 'Coffee Mug', price: 12, category: 'home', rating: 4.1 },
  { id: 6, name: 'Desk Lamp', price: 35, category: 'home', rating: 4.4 },
];

const ProductDashboard = () => {
  const [products] = useState(productsData);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  // Filter products (needs optimization)
  const filteredProducts = useMemo(()=>{
    return products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });
},[products,search,category]);

  // Sort products (needs optimization)
  const sortedProducts = useMemo(()=>{
    return filteredProducts.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });
},[products,search,category]);

  // Add to cart (needs optimization)
  const addToCart = useCallback((product) => {
    setCart([...cart, product]);
  },[]);

  // Remove from cart (needs optimization)
  const removeFromCart = useCallback((productId) => {
    setCart(cart.filter(item => item.id !== productId));
  },[]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Dashboard</h1>
      
      {/* Filters */}
      <div>
        <input 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {/* Product List */}
      <div>
        <h2>Products ({sortedProducts.length})</h2>
        {sortedProducts.map(product => (
          <ProductItem 
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {/* Shopping Cart */}
      <div>
        <h2>Shopping Cart ({cart.length})</h2>
        {cart.map(item => (
          <CartItem 
            key={item.id}
            item={item}
            onRemove={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
};

// Product Item Component (needs optimization)
const ProductItem = React.memo(({ product, onAddToCart }) => {
  console.log('ProductItem rendered:', product.name);
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating} ⭐</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
});

// Cart Item Component (needs optimization)
const CartItem = React.memo(({ item, onRemove }) => {
  console.log('CartItem rendered:', item.name);
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
      <span>{item.name} - ${item.price}</span>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
});



const ModuleSeven=()=>{
  return(
    <ProductDashboard/>
  )
}

export default ModuleSeven;