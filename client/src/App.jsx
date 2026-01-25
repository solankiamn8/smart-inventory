import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";

// Placeholder Componenets
const Home = () => <h2>Home Page</h2>
const Login = () => <h2>Login Page</h2>
const Dashboard = () => <h2>Secret Dashboard</h2>

function App() {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <Navbar theme={theme} toggleTheme={toggleTheme}/>
      <main>
        <Routes style={{ padding: '2rem' }}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;