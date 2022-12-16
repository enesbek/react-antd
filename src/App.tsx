import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/home/Home";
import { Products } from "./components/Products";
import { Companies } from "./components/companies/Companies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="companies" element={<Companies />} />
        <Route path="products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
