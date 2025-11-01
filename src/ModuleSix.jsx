import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  return <h1>Home Page 🏠</h1>;
};

const About = () => {
  return <h1>About Page 📖</h1>;
};

const Contact = () => {
  return <h1>Contact Page 📞</h1>;
};
const Routing=()=>{
  return (
    <BrowserRouter>
      {/* Navigation Links */}
      <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ margin: '10px' }}>Home</Link>
        <Link to="/about" style={{ margin: '10px' }}>About</Link>
        <Link to="/contact" style={{ margin: '10px' }}>Contact</Link>
      </nav>
  
      {/* Route Configuration */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}


// Product List Page
const Products = () => {
  const products = [
    { id: 1, name: 'iPhone', price: 50000 },
    { id: 2, name: 'MacBook', price: 90000 }
  ];

  return (
    <div>
      <h1>Products</h1>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {/* Dynamic link to product detail */}
          <Link to={`/products/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

// Product Detail Page
const ProductDetail = () => {
  const { id } = useParams(); // Extract URL parameter
  
  const products = [
    { id: 1, name: 'iPhone', price: 50000, description: 'Best smartphone' },
    { id: 2, name: 'MacBook', price: 90000, description: 'Powerful laptop' }
  ];
  console.log(id)
  const product = products.find(p => p.id === parseInt(id));

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>
      <Link to="/products">← Back to Products</Link>
    </div>
  );
};

// Updated App with dynamic route
function DynamicRoutes() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* Dynamic route with parameter */}
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate login logic
    if (username === 'gokul') {
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } else {
      alert('Login failed!');
    }
  };

  const goBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Perform logout logic
//     alert('Logged out!');
//     navigate('/'); // Redirect to home
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <p>Welcome, Gokul!</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// Updated App
function ProgrammaticNavigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

import { Outlet } from 'react-router-dom';

// Parent Layout Component
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Nested Navigation */}
      <nav>
        <Link to="/dashboard">Profile</Link>
        <Link to="/dashboard/posts">Posts</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>

      {/* Where child components appear */}
      <Outlet />
    </div>
  );
};

// Child Components
const Profile = () => <h2>Profile Section</h2>;
const Posts = () => <h2>Posts Section</h2>;
const Settings = () => <h2>Settings Section</h2>;

// App with Nested Routes
function Nested() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Nested Route */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Profile />} /> {/* /dashboard */}
          <Route path="posts" element={<Posts />} /> {/* /dashboard/posts */}
          <Route path="settings" element={<Settings />} /> {/* /dashboard/settings */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


const students = [
  { id: 1, name: "Gokulkumar", age: 21, course: "Computer Science", grade: "A" },
  { id: 2, name: "Alice", age: 22, course: "Electrical Engineering", grade: "B+" },
  { id: 3, name: "Bob", age: 20, course: "Mechanical Engineering", grade: "A-" }
];

const courses = [
  { id: 1, name: "React.js", duration: "2 months", instructor: "John Doe" },
  { id: 2, name: "Node.js", duration: "3 months", instructor: "Jane Smith" },
  { id: 3, name: "MongoDB", duration: "1 month", instructor: "Mike Johnson" }
];


// You need to create these components:
// const Home = () => {
//   return <h1>Welcome to Student Portal</h1>;
// };

const Students = () => {
  // Display list of students with links to their details
  const navigate=useNavigate()
  const navStudentDetail=(id)=>{
    console.log(id)
    navigate(`/StudentDetail/${id}`)
  }
  return (
    <div>
      {/* Your code */}
      {students.map(student=>(
        <div key={student.id}>
          <h2>{student.name}</h2>
          <button onClick={()=>navStudentDetail(student.id)}>View Details</button>
        </div>
      ))}
    </div>
  );
};

const StudentDetail = () => {
  // Display individual student details
  const {id}=useParams();
  const student=students.find(s=>s.id===parseInt(id));
  return (
    <div>
      {/* Your code */}
      <h2>Student Details</h2>
      <h2>{student.name}</h2>
      <h2>{student.age}</h2>
      <h2>{student.course}</h2>
      <h2>{student.grade}</h2>
      <Link to="/Students">Go Back</Link>
    </div>
  );
};

const Courses = () => {
  // Display list of courses
  return (
    <div>
      {/* Your code */}
      {courses.map(course=>(
        <div key={course.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h2>{course.name}</h2>
          <h2>{course.duration}</h2>
          <h2>{course.instructor}</h2>
        </div>
      ))}
      <Link to="/Students">Go Back</Link>
    </div>
  );
};

const Practice = () => {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
        {/* Create navigation links */}
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/Students" style={{ marginRight: '15px' }}>Students</Link>
        <Link to="/Courses">Courses</Link>
      </nav>
      
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/Students" element={<Students />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/StudentDetail/:id" element={<StudentDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

const ModuleSix = () => {
  return (
    <Nested/>
  )
};

export default ModuleSix;