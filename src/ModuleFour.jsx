import { useEffect, useState } from 'react';

const SimpleEffect = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('Component Rendered!');
  });
  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  return (
    <>
      <p onClick={increaseCount}>Count:{count}</p>
    </>
  );
};

const DependencyArray = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 1. No dependency array - runs after every render
  useEffect(() => {
    console.log('🎯 Runs every time');
  });

  // 2. Empty dependency array - runs only once (on mount)
  useEffect(() => {
    console.log('🚀 Runs only once when component mounts');
  }, []);

  // 3. With dependencies - runs when dependencies change
  useEffect(() => {
    console.log('📊 Count changed:', count);
  }, [count]); // Only runs when count changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Name: {name}</p>
    </div>
  );
};

const ApiExample = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty array = run only once

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h3>Users List:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

const CleanupExample = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function - runs when component unmounts
    return () => {
      console.log('🧹 Cleaning up interval');
      clearInterval(interval);
    };
  }, []); // Empty array = setup and cleanup once

  return (
    <div>
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

const JokeTeller = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  // Your code here
  const fetchJokes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://official-joke-api.appspot.com/random_joke'
      );
      const data = await response.json();
      setJokes(data);
      console.log(jokes);
    } catch (error) {
      console.log('Error in Fetching:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJokes();
  }, []);

  if (loading && !jokes) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {jokes &&
        <>
          <p>{jokes.setup}</p>
          <p>{jokes.punchline}</p>
        </>
      }
      <button onClick={fetchJokes} disabled={loading}>
        Fetch joke!
      </button>
    </>
  );
};

const MissingDependencies = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);

  // ❌ BAD: Missing multiplier dependency
  useEffect(() => {
    console.log("Result:", count * multiplier);
    // This effect uses multiplier but doesn't list it as dependency
  }, [count]); // Missing [multiplier]

  // ✅ GOOD: All dependencies included
  useEffect(() => {
    console.log("Correct result:", count * multiplier);
  }, [count, multiplier]); // All dependencies listed

  return (
    <div>
      <p>Count: {count}</p>
      <p>Multiplier: {multiplier}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>
      <button onClick={() => setMultiplier(multiplier + 1)}>
        Increase Multiplier
      </button>
    </div>
  );
};

const InfiniteLoopExample = () => {
  const [count, setCount] = useState(0);

  
  // ✅ SAFE: Empty array (runs once)
  useEffect(() => {
    console.log("This runs safely once");
  }, []);

  // ✅ SAFE: Conditional updates
  useEffect(() => {
    if (count < 10) {
      setCount(prev => prev + 1);
    }
  }, [count]); // But still dangerous!

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
};

const FunctionDependencies = () => {
  const [user, setUser] = useState("");
  const [data, setData] = useState(null);

  // ❌ BAD: Function recreated on every render
  const fetchUserData = () => {
    console.log("Fetching data for:", user);
    // API call would go here
  };

  // This causes effect to run on every render!
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, fetchUserData]); // fetchUserData changes every render!

  // ✅ GOOD: useCallback to memoize function
  const stableFetchUserData = useCallback(() => {
    console.log("Fetching data for:", user);
    // API call would go here
  }, [user]); // Only recreates when user changes

  useEffect(() => {
    if (user) {
      stableFetchUserData();
    }
  }, [user, stableFetchUserData]); // Now stable!

  return (
    <div>
      <input 
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter username"
      />
    </div>
  );
};

const ObjectDependencies = () => {
  const [user, setUser] = useState({ name: "", age: 0 });

  // ❌ PROBLEM: Object reference changes every render
  useEffect(() => {
    console.log("User changed:", user);
  }, [user]); // user object reference changes on every render!

  // ✅ SOLUTION: Use specific properties
  useEffect(() => {
    console.log("User name changed:", user.name);
  }, [user.name]); // Only when name actually changes

  // ✅ BETTER: Use primitive values in dependencies
  useEffect(() => {
    console.log("User age changed:", user.age);
  }, [user.age]);

  const updateName = () => {
    // This creates new object → effect runs
    setUser({ ...user, name: "John" });
  };

  const updateAge = () => {
    // This creates new object → effect runs  
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={updateName}>Update Name</button>
      <button onClick={updateAge}>Update Age</button>
    </div>
  );
};

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const allProducts = [
    { id: 1, name: "iPhone", category: "Electronics" },
    { id: 2, name: "MacBook", category: "Electronics" },
    { id: 3, name: "T-Shirt", category: "Clothing" },
    { id: 4, name: "Jeans", category: "Clothing" },
    { id: 5, name: "React Book", category: "Books" },
    { id: 6, name: "JavaScript Book", category: "Books" }
  ];

  // Your useEffect with proper dependencies
  // Add debounce logic
  useEffect(()=>{
    if (searchTerm===""){
      setResults([])
      return;
    }else{
      const timeOutId=setTimeout(()=>{
        const filteredRestlt=allProducts.filter(product=>product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setResults(filteredRestlt)
      },1000)
      return ()=>{
        clearTimeout(timeOutId);
        console.log(results.length)
      }
    }
  },[searchTerm])
  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <div>
        <h4>Result:</h4>
        <br/>
        {
          results.length===0?(
            <p>No products found!</p>
          ):(
            results.map((product)=>(
              <div key={product.id}>
                <p><strong>{product.name}</strong> - {product.category}</p>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

const ModuleFour = () => {
  return (
    <>
      <SearchComponent />
    </>
  );
};
export default ModuleFour;
