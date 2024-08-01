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
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
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
        <Route path="/doctors" element={<Doctors/>} />
        <Route path="/doctors/:id" element={<DoctorDetails/>} />
        <Route path="/users/profile/me" element={<PatientDashboard/>} />
        <Route path="/doctors/profile/me" element={<DoctorDashboard/>} />
      </Routes>
    </>
  );
}

export default App;
