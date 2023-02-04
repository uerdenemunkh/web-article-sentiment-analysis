import './assets/styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Google from './pages/Google';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Google />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
