import './App.css'
import About from './pages/About'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import { Routes, Route, Link } from "react-router-dom"

function App() {
  return (
    <>
      <header>
        <nav style={{ display: "flex", gap: "10px" }}>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/shop">Shop</Link>
        </nav>
      </header>
      <section id='center'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:product_id" element={<Product />}/>
          <Route path="*" element={<h2>404 Page not found</h2>} />
        </Routes>
      </section>
    </>
  )
}

export default App
