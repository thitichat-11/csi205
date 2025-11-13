// user components
import Components from "./pages/Components";

// stylesheets
import "./App.css";
import Home from "./pages/Home";
import Animation from "./pages/Animation";
import Calculator from "./pages/Calculator";
import ForwardToHome from "./pages/ForwardToHome";
import AppLayout from "./layouts/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todos from "./pages/Todos";
import Products from "./pages/Products";
import Carts from "./pages/Carts";
import { useEffect, useState } from "react";
import { fetchProducts } from "./data/products";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

function App() {

  const [token, setToken] = useState('')
  const [role, setRole] = useState('')

  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])

  useEffect( () => {
    setProducts(fetchProducts())
  }, [] )

  useEffect( () => {
    console.log(products)
  }, [products])

  if (token === '') { 
  return (<Login setToken={setToken} setRole={setRole} />)
  } else {


  return (
    <BrowserRouter basename="/csi205/">
      <Routes>
        <Route element={<AppLayout
        products={products} carts={carts} setToken={setToken} />}>
          <Route path="home" element={<Home />} />
          <Route path="components" element={<Components />} />
          <Route path="animation" element={<Animation />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="todos" element={<Todos />} />
          <Route path="products" element={<Products
          products={products} carts={carts} setCarts={setCarts} />} />
          <Route path="carts" element={<Carts
          carts={carts} setCarts={setCarts} />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<ForwardToHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  }
}

export default App;
