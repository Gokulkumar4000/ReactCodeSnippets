import { useState } from "react"


const SimpleForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    console.log("Form submitted:", name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
    </form>
  );
};



const MultipleInputsRight = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    age: ""
  });

  // Single handler for all inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input 
        name="email"
        value={formData.email} 
        onChange={handleChange}
        placeholder="Email"
      />
      <input 
        name="age"
        value={formData.age}
        onChange={handleChange} 
        placeholder="Age"
      />
      <button>Submit</button>
    </form>
  );
};

const InputTypes = () => {
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    password: "",
    checkbox: false,
    select: "option1",
    textarea: ""
  });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" 
      ? e.target.checked 
      : e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Text Input */}
      <input 
        name="text"
        value={formData.text}
        onChange={handleChange}
        placeholder="Text input"
      />

      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          name="checkbox" 
          checked={formData.checkbox}
          onChange={handleChange}
        />
        Check me
      </label>

      {/* Select Dropdown */}
      <select name="select" value={formData.select} onChange={handleChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      {/* Textarea */}
      <textarea 
        name="textarea"
        value={formData.textarea}
        onChange={handleChange}
        placeholder="Textarea"
      />

      <button>Submit</button>
    </form>
  );
};

const InputTypesTwo = () => {
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    password: "",
    checkbox: false,
    select: "option1",
    textarea: ""
  });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" 
      ? e.target.checked 
      : e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Text Input */}
      <input 
        name="text"
        value={formData.text}
        onChange={handleChange}
        placeholder="Text input"
      />

      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          name="checkbox" 
          checked={formData.checkbox}
          onChange={handleChange}
        />
        Check me
      </label>

      {/* Select Dropdown */}
      <select name="select" value={formData.select} onChange={handleChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      {/* Textarea */}
      <textarea 
        name="textarea"
        value={formData.textarea}
        onChange={handleChange}
        placeholder="Textarea"
      />

      <button>Submit</button>
    </form>
  );
};

const ModuleThreePartOne=()=>{
  const [count,setCount]=useState(0);
  const [text,setText]=useState("");
  const [toggle,setToggle]=useState(false);
  const increase =()=>{
    setCount(prevCount=> prevCount+1);
  }
  const decrease =()=>{
    setCount(prevCount=> prevCount-1);
  }
  const tracker=(e)=>{
    setText(e.target.value)
  }
  const changeToggle=()=>{
    setToggle(!toggle);
  }
  return (
    <>
      <div>
        <p>Count: {count}</p>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
      </div>
      <br/>
      <input type="text" onChange={tracker}/>
      <p>Text: {text}</p>
      <br/>
      <button onClick={changeToggle}>{toggle ? "Show" : "Hide"}</button>
      <MultipleInputsRight />
    </>
  )
}


const ModuleThreePartTwo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkbox: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name"
        value={formData.name}
        placeholder="Name" 
        onChange={handleChange}
      />
      
      <input 
        type="email" 
        name="email"
        value={formData.email}
        placeholder="Email" 
        onChange={handleChange}
      />
      
      <label>
        <input 
          type="checkbox" 
          name="checkbox"
          checked={formData.checkbox}
          onChange={handleChange}
        /> 
        Remind Me!
      </label>
      
      <button>Submit</button>
    </form>
  );
};


const ModuleThree=()=>{
  return(
    <>
      <ModuleThreePartTwo/>
    </>
  )
}
export default ModuleThree;