import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import p1 from "./assets/p1.png";
import p2 from "./assets/p2.png";
import p3 from "./assets/p3.png";
import p4 from "./assets/p4.png";
import p5 from "./assets/p5.png";
import p6 from "./assets/p6.png";

// ---------- Login Component ----------
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Login successful!");
      navigate("/shop");
    } else {
      alert("Invalid credentials!");
    }
  }

  return (
    <div className="container">
      <h1 className="head">Log-In</h1>
      <h1 className="logo">The Mountain Shop</h1>
      <input
        className="email"
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="password"
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login" onClick={handleLogin}>Login</button>
      <a href="/#/signup" id="switch">Don't have an account? Sign up</a>
    </div>
  );
}

// ---------- Signup Component ----------
function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignup() {
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Sign up successful! You can now log in.");
    navigate("/login");
  }

  return (
    <div className="container">
      <h1 className="head">Sign-Up</h1>
      <h1 className="logo">The Mountain Shop</h1>
      <input
        className="email"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="email"
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="password"
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login" onClick={handleSignup}>Sign Up</button>
      <a href="/#/login" id="switch">Already have an account? Log in</a>
    </div>
  );
}

// ---------- Shop Component ----------
function Shop() {
  const navigate = useNavigate();
  const [m, setM] = useState(2);
  const [img, setImg] = useState("🌙");

  const [plant] = useState([
    { name: "Weeping Willow Tree", Price: "$74.95", Photo: p1, info: "Weeping Willow Tree Salix babylonica. A top choice for fast-growing shade, growing up to 3-4 ft. per year." },
    { name: "Elberta Peach Tree", Price: "$90.95", Photo: p2, info: "Elberta Peach Tree yields large, juicy peaches ideal for eating and canning." },
    { name: "Red Sunset Maple Tree", Price: "$144.95", Photo: p3, info: "Red Sunset Maple Tree with vibrant fall foliage, heat and drought tolerant." },
    { name: "Autumn Cherry Tree", Price: "$74.95", Photo: p4, info: "Beautiful tree with delicate cherry blossoms during autumn." },
    { name: "Meyer Lemon Tree", Price: "$74.95", Photo: p5, info: "Perfect for indoor/outdoor growth, produces juicy lemons." },
    { name: "Red Haven Peach", Price: "$74.95", Photo: p6, info: "Cold-hardy variety of peach with great flavor." }
  ]);

  const [search, setSearch] = useState("");

  function Mode() {
    let t = document.querySelector(".Nav");
    let q = document.querySelector("#down");
    let h = document.querySelector("h2");
    let brit = document.querySelector("body");

    setM((p) => {
      if (p % 2 === 0) {
        t.style.backgroundColor = "rgba(255, 255, 285, 0.7)";
        q.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        h.style.color = "black";
        brit.style.filter = "brightness(1)";
        setImg("🌙");
      } else {
        t.style.backgroundColor = "rgba(24, 38, 55, 0.65)";
        q.style.backgroundColor = "rgba(56, 60, 70, 0.73)";
        h.style.color = "white";
        brit.style.filter = "brightness(0.9)";
        setImg("☀️");
      }
      return p + 1;
    });
  }

  const filteredPlants = plant.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleInfoClick(index) {
    navigate("/information", { state: { plant: filteredPlants[index] } });
  }

  return (
    <>
      <nav className="Nav">
        <h2>The Mountain Shop</h2>
        <input
          type="text"
          placeholder="Type to Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button id="darkmode" onClick={Mode}>{img}</button>
      </nav>
      <div id="message">
        <h1>Buy Exotic Plants</h1>
      </div>
      <section id="down">
        <div className="trees">
          {filteredPlants.map((k, i) => (
            <div className="showtrees" key={i}>
              <img src={k.Photo} alt={k.name} />
              <p><b>Name:</b> {k.name}</p>
              <p><b>Price:</b> {k.Price}</p>
              <button id="infoclick" onClick={() => handleInfoClick(i)}>Click to get Info</button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// ---------- Information Component ----------
function Information() {
  const location = useLocation();
  const { plant } = location.state || {};

  if (!plant) {
    return <p>No plant information available.</p>;
  }

  return (
    <div className="info">
      <img src={plant.Photo} alt={plant.name} />
      <p><b>Name:</b> {plant.name}</p>
      <p><b>Price:</b> {plant.Price}</p>
      <p>{plant.info}</p>
    </div>
  );
}

// ---------- Main App Component ----------
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/information" element={<Information />} />
    </Routes>
  );
}
