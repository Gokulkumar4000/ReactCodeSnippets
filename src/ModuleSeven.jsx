import { memo, useMemo ,useCallback} from 'react';
import React ,{ useState ,useRef} from 'react';

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


const ModuleSeven=()=>{
  return(
    <UseRefDemo/>
  )
}

export default ModuleSeven;