import './assets/styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Google from './pages/Google';
import GooglResult from './pages/GoogleResult';
import PageResult from './pages/PageResult';
import TextResult from './pages/TextResult';
import TextInput from './pages/TextInput';
import Navbar from './components/navbar';
import { NavbarPrivider } from './context/navbarProvider';
import Loading from './components/loading';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarPrivider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Google />} />
            <Route path='/text-input' element={<TextInput />} />
            <Route path='/result-google' element={<GooglResult />} />
            <Route path='/result-page' element={<PageResult />} />
            <Route path='/result-text' element={<TextResult />} />
            <Route path='/loading' element={<Loading />} />
          </Routes>
        </NavbarPrivider>
      </BrowserRouter>
    </div>
  )
}