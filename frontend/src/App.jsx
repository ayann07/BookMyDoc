import "./app.css";
import {Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home'
import Contact from './pages/Contact'
import DoctorDetails from './pages/DoctorDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/Doctors" element={<Doctors/>} />
        <Route path="/Doctors/:id" element={<DoctorDetails/>} />
      </Routes>
    </>
  );
}

export default App;
