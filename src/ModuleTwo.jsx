// Card component that uses children
const ModuleTwo = ({ name, price, category, isAvailable}) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px' }}>
      <h2>Name:{name}</h2>
      <span>Price:${price}</span>
      <p>Category:{category} </p>
      <p>{isAvailable? "Available":"Coming soon"}</p>
    </div>
  );
};

export default ModuleTwo;