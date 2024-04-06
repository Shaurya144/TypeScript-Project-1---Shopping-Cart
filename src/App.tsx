import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from './components/Navbar.tsx'
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx"
import { ShoppingCart } from "./pages/ShoppingCart.tsx"

function App() {
  return (
    <>
    <ShoppingCartProvider>
    <Navbar/>
    <Container className="mb-4">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Store" element={<Store/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/ShoppingCart" element={<ShoppingCart/>}/>

      </Routes>
    </Container>
    </ShoppingCartProvider>
  </>
  )
}

export default App
