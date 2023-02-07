import './assets/styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Google from './pages/Google';
import GooglResult from './pages/GoogleResult';
import PageResult from './pages/PageResult';
import TextInput from './pages/TextInput';
import Navbar from './components/navbar';
import Loading from './components/loading';
import Error from './pages/Error';
import { NavbarPrivider } from './context/navbarProvider';

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
            <Route path='/loading' element={<Loading />} />
            <Route path='/error' element={<Error />} />
          </Routes>
        </NavbarPrivider>
      </BrowserRouter>
    </div>
  )
}