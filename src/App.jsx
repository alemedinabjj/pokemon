import { Details } from './pages/Details'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ContextProvider } from './Context/Context'
import { Footer } from './components/Footer'
import { Battle } from './pages/Battle'


function App() {
  return (
    <ContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:name" element={<Details />} />
          <Route path="/battle" element={<Battle />} />
        </Routes>
      </Router>
      <Footer />
    </ContextProvider>
  )
}

export default App
