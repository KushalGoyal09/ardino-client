import Home from './components/home';
import Login from './components/login'
import Signup from './components/signup';
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
